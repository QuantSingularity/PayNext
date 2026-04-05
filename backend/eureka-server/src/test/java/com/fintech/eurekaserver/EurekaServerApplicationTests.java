package com.fintech.eurekaserver;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EurekaServerApplicationTests {

  @LocalServerPort private int port;

  @Autowired private TestRestTemplate restTemplate;

  @Test
  void contextLoads() {
    assertTrue(port > 0, "Server port should be assigned");
  }

  @Test
  void eurekaEndpointShouldBeAvailable() {
    ResponseEntity<String> response =
        restTemplate.getForEntity("http://localhost:" + port + "/eureka/apps", String.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }

  @Test
  void eurekaStatusEndpointShouldReturnUp() {
    ResponseEntity<String> response =
        restTemplate.getForEntity("http://localhost:" + port + "/actuator/health", String.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertTrue(response.getBody().contains("UP"));
  }
}
