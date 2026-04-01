package com.fintech.notificationservice.model;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {
  private String recipient;
  private String message;
  private String recipientEmail;
  private String subject;
  private Map<String, Object> properties;

  public NotificationRequest(String recipient, String message) {
    this.recipient = recipient;
    this.message = message;
    this.recipientEmail = recipient;
    this.subject = "PayNext Notification";
  }
}
