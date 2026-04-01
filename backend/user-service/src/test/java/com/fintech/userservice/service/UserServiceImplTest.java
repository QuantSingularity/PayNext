package com.fintech.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.fintech.userservice.model.User;
import com.fintech.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

  @Mock private UserRepository userRepository;
  @Mock private PasswordEncoder passwordEncoder;

  @InjectMocks private UserServiceImpl userService;

  private User testUser;

  @BeforeEach
  void setUp() {
    testUser = new User();
    testUser.setUsername("testuser");
    testUser.setEmail("test@example.com");
    testUser.setPassword("Password1@");
    testUser.setRole("ROLE_USER");
  }

  @Test
  void saveUser_shouldEncodePasswordAndSave() {
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
    when(userRepository.save(any(User.class))).thenAnswer(inv -> {
      User u = inv.getArgument(0);
      u.setId(1L);
      return u;
    });

    User saved = userService.saveUser(testUser);

    assertNotNull(saved);
    assertEquals("encodedPassword", saved.getPassword());
    assertEquals("ROLE_USER", saved.getRole());
    verify(passwordEncoder).encode("Password1@");
    verify(userRepository).save(testUser);
  }

  @Test
  void saveUser_withNullPassword_shouldThrowIllegalArgumentException() {
    testUser.setPassword(null);

    assertThrows(IllegalArgumentException.class, () -> userService.saveUser(testUser));
    verify(userRepository, never()).save(any());
  }

  @Test
  void saveUser_withBlankPassword_shouldThrowIllegalArgumentException() {
    testUser.setPassword("   ");

    assertThrows(IllegalArgumentException.class, () -> userService.saveUser(testUser));
    verify(userRepository, never()).save(any());
  }

  @Test
  void saveUser_withNullRole_shouldDefaultToRoleUser() {
    testUser.setRole(null);
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
    when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

    User saved = userService.saveUser(testUser);

    assertEquals("ROLE_USER", saved.getRole());
  }

  @Test
  void findByUsername_shouldReturnUser() {
    when(userRepository.findByUsername("testuser")).thenReturn(testUser);

    User found = userService.findByUsername("testuser");

    assertNotNull(found);
    assertEquals("testuser", found.getUsername());
    verify(userRepository).findByUsername("testuser");
  }

  @Test
  void findByUsername_whenNotFound_shouldReturnNull() {
    when(userRepository.findByUsername(anyString())).thenReturn(null);

    assertNull(userService.findByUsername("ghost"));
    verify(userRepository).findByUsername("ghost");
  }
}
