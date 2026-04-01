package com.fintech.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
    name = "users",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email")
    })
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Username is required")
  @Column(nullable = false, unique = true)
  private String username;

  @JsonIgnore
  @Column(nullable = false)
  private String password;

  @Email(message = "Invalid email format")
  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String role = "ROLE_USER";

  @Column(nullable = false)
  private boolean enabled = true;
}
