package com.fintech.userservice.service;

import com.fintech.userservice.model.User;
import com.fintech.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public User saveUser(User user) {
    if (user.getPassword() == null || user.getPassword().isBlank()) {
      throw new IllegalArgumentException("Password must not be empty");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    if (user.getRole() == null || user.getRole().isBlank()) {
      user.setRole("ROLE_USER");
    }
    return userRepository.save(user);
  }

  @Override
  public User findByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  @Override
  public User findById(Long id) {
    return userRepository.findById(id).orElse(null);
  }
}
