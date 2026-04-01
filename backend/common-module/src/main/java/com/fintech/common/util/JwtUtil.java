package com.fintech.common.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret;

  private final long expiration = 604800000L;

  private Key getSigningKey() {
    byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateToken(UserDetails userDetails) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + expiration);

    return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .claim(
            "role",
            userDetails.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("USER"))
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    try {
      Claims claims =
          Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(token)
              .getBody();
      return claims.getSubject();
    } catch (io.jsonwebtoken.security.SecurityException ex) {
      log.error("Invalid JWT signature: {}", ex.getMessage());
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token: {}", ex.getMessage());
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token: {}", ex.getMessage());
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token: {}", ex.getMessage());
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty: {}", ex.getMessage());
    }
    return null;
  }

  public boolean validateToken(String token, String username) {
    try {
      String extractedUsername = getUsernameFromToken(token);
      return extractedUsername != null
          && extractedUsername.equals(username)
          && !isTokenExpired(token);
    } catch (Exception e) {
      log.error("Error validating token: {}", e.getMessage());
      return false;
    }
  }

  private boolean isTokenExpired(String token) {
    try {
      Claims claims =
          Jwts.parserBuilder()
              .setSigningKey(getSigningKey())
              .build()
              .parseClaimsJws(token)
              .getBody();
      return claims.getExpiration().before(new Date());
    } catch (ExpiredJwtException ex) {
      return true;
    } catch (Exception ex) {
      log.error("Error checking token expiration: {}", ex.getMessage());
      return true;
    }
  }

  public Claims extractAllClaims(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token)
          .getBody();
    } catch (Exception e) {
      log.error("Error extracting claims from token: {}", e.getMessage());
      return null;
    }
  }
}
