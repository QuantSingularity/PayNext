package com.fintech.userservice.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.common.util.JwtUtil;
import com.fintech.userservice.filter.JwtAuthenticationFilter;
import com.fintech.userservice.model.User;
import com.fintech.userservice.service.UserService;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
class UserControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private UserService userService;
  @MockBean private AuthenticationManager authenticationManager;
  @MockBean private JwtUtil jwtUtil;
  @MockBean private UserDetailsService userDetailsService;
  @MockBean private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Autowired private ObjectMapper objectMapper;

  private User testUser;

  @BeforeEach
  void setUp() {
    testUser = new User();
    testUser.setId(1L);
    testUser.setUsername("testuser");
    testUser.setEmail("test@example.com");
    testUser.setPassword("Password1@");
    testUser.setRole("ROLE_USER");
  }

  /** Build a registration request body that includes the password in JSON. */
  private String registerJson(String username, String password, String email) throws Exception {
    Map<String, String> body = new HashMap<>();
    body.put("username", username);
    body.put("password", password);
    body.put("email", email);
    return objectMapper.writeValueAsString(body);
  }

  /** Build a login request body that includes the password in JSON. */
  private String loginJson(String username, String password) throws Exception {
    Map<String, String> body = new HashMap<>();
    body.put("username", username);
    body.put("password", password);
    return objectMapper.writeValueAsString(body);
  }

  @Test
  void register_withValidUser_shouldReturnCreated() throws Exception {
    when(userService.findByUsername(anyString())).thenReturn(null);
    when(userService.findByEmail(anyString())).thenReturn(null);
    when(userService.saveUser(any(User.class))).thenReturn(testUser);

    mockMvc
        .perform(
            post("/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson("testuser", "Password1@", "test@example.com")))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.username").value(testUser.getUsername()))
        .andExpect(jsonPath("$.email").value(testUser.getEmail()));
  }

  @Test
  void register_withExistingUsername_shouldReturnBadRequest() throws Exception {
    when(userService.findByUsername(anyString())).thenReturn(testUser);

    mockMvc
        .perform(
            post("/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson("testuser", "Password1@", "test@example.com")))
        .andExpect(status().isBadRequest());
  }

  @Test
  void register_withInvalidPassword_shouldReturnBadRequest() throws Exception {
    mockMvc
        .perform(
            post("/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson("testuser", "weak", "test@example.com")))
        .andExpect(status().isBadRequest());
  }

  @Test
  void register_withInvalidEmail_shouldReturnBadRequest() throws Exception {
    mockMvc
        .perform(
            post("/users/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerJson("testuser", "Password1@", "not-an-email")))
        .andExpect(status().isBadRequest());
  }

  @Test
  void login_withValidCredentials_shouldReturnToken() throws Exception {
    UserDetails mockUserDetails =
        org.springframework.security.core.userdetails.User.withUsername("testuser")
            .password("encoded")
            .roles("USER")
            .build();
    org.springframework.security.core.Authentication auth =
        new UsernamePasswordAuthenticationToken(
            mockUserDetails, null, mockUserDetails.getAuthorities());

    when(authenticationManager.authenticate(any())).thenReturn(auth);
    when(jwtUtil.generateToken(any(UserDetails.class))).thenReturn("mock-jwt-token");

    mockMvc
        .perform(
            post("/users/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson("testuser", "Password1@")))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("mock-jwt-token"));
  }

  @Test
  void login_withInvalidCredentials_shouldReturnUnauthorized() throws Exception {
    when(authenticationManager.authenticate(any()))
        .thenThrow(new BadCredentialsException("Bad credentials"));

    mockMvc
        .perform(
            post("/users/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson("testuser", "wrongpassword")))
        .andExpect(status().isUnauthorized());
  }

  @Test
  @WithMockUser
  void getUserById_whenFound_shouldReturnOk() throws Exception {
    when(userService.findById(1L)).thenReturn(testUser);

    mockMvc
        .perform(get("/users/1").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value(testUser.getUsername()));
  }

  @Test
  @WithMockUser
  void getUserById_whenNotFound_shouldReturnNotFound() throws Exception {
    when(userService.findById(999L)).thenReturn(null);

    mockMvc
        .perform(get("/users/999").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isNotFound());
  }
}
