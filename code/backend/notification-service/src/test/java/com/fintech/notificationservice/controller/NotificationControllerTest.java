package com.fintech.notificationservice.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.notificationservice.model.NotificationRequest;
import com.fintech.notificationservice.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(NotificationController.class)
class NotificationControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private NotificationService notificationService;
  @Autowired private ObjectMapper objectMapper;

  private NotificationRequest notificationRequest;

  @BeforeEach
  void setUp() {
    notificationRequest = new NotificationRequest();
    notificationRequest.setRecipientEmail("test@example.com");
    notificationRequest.setSubject("Test Subject");
    notificationRequest.setRecipient("test@example.com");
    notificationRequest.setMessage("Test message body");
  }

  @Test
  @WithMockUser
  void sendNotification_shouldReturnOk() throws Exception {
    doNothing().when(notificationService).sendNotification(any(NotificationRequest.class));

    mockMvc
        .perform(
            post("/notifications/send")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(notificationRequest)))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser
  void sendNotification_whenServiceThrows_shouldReturnInternalServerError() throws Exception {
    doThrow(new RuntimeException("Mail server unavailable"))
        .when(notificationService).sendNotification(any(NotificationRequest.class));

    mockMvc
        .perform(
            post("/notifications/send")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(notificationRequest)))
        .andExpect(status().isInternalServerError());
  }
}
