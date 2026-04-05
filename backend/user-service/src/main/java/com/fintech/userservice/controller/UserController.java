package com.fintech.userservice.controller;

import com.fintech.common.util.JwtUtil;
import com.fintech.common.util.PasswordValidator;
import com.fintech.userservice.model.User;
import com.fintech.userservice.service.UserService;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;

  @Autowired
  public UserController(
      UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
    this.userService = userService;
    this.authenticationManager = authenticationManager;
    this.jwtUtil = jwtUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User user) {
    if (user.getUsername() == null || user.getUsername().isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
    }

    if (user.getEmail() == null || user.getEmail().isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("error", "Email is required"));
    }

    try {
      PasswordValidator.validate(user.getPassword());
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    if (userService.findByUsername(user.getUsername()) != null) {
      return ResponseEntity.badRequest().body(Map.of("error", "Username is already taken"));
    }

    User savedUser = userService.saveUser(user);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(
            Map.of(
                "id", savedUser.getId(),
                "username", savedUser.getUsername(),
                "email", savedUser.getEmail(),
                "role", savedUser.getRole()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
    if (loginRequest.getUsername() == null || loginRequest.getUsername().isBlank()) {
      return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
    }

    try {
      Authentication authentication =
          authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(
                  loginRequest.getUsername(), loginRequest.getPassword()));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String jwt = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());
      return ResponseEntity.ok(new AuthResponse(jwt));
    } catch (BadCredentialsException e) {
      log.warn("Authentication failed for user: {}", loginRequest.getUsername());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(Map.of("error", "Invalid credentials"));
    } catch (Exception e) {
      log.error("Unexpected error during login for user: {}", loginRequest.getUsername(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("error", "An unexpected error occurred"));
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable Long id) {
    User user = userService.findById(id);
    if (user == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(Map.of("error", "User not found with id: " + id));
    }
    return ResponseEntity.ok(
        Map.of(
            "id", user.getId(),
            "username", user.getUsername(),
            "email", user.getEmail(),
            "role", user.getRole()));
  }
}
