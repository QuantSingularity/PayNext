package com.fintech.paymentservice.model;

public class NotificationRequest {
  private String recipient;
  private String recipientEmail;
  private String message;
  private String subject;

  public NotificationRequest() {}

  public NotificationRequest(String recipient, String message) {
    this.recipient = recipient;
    this.recipientEmail = recipient;
    this.message = message;
  }

  public String getRecipient() {
    return recipient;
  }

  public void setRecipient(String recipient) {
    this.recipient = recipient;
  }

  public String getRecipientEmail() {
    return recipientEmail;
  }

  public void setRecipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  @Override
  public String toString() {
    return "NotificationRequest{"
        + "recipient='"
        + recipient
        + '\''
        + ", recipientEmail='"
        + recipientEmail
        + '\''
        + ", message='"
        + message
        + '\''
        + ", subject='"
        + subject
        + '\''
        + '}';
  }
}
