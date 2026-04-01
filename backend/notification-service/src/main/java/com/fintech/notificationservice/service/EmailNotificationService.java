package com.fintech.notificationservice.service;

import com.fintech.notificationservice.model.NotificationRequest;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@Service
public class EmailNotificationService implements NotificationService {

  private final JavaMailSender mailSender;
  private final TemplateEngine templateEngine;

  @Autowired
  public EmailNotificationService(JavaMailSender mailSender, TemplateEngine templateEngine) {
    this.mailSender = mailSender;
    this.templateEngine = templateEngine;
  }

  @Override
  public void sendNotification(NotificationRequest notificationRequest) {
    String recipientEmail = notificationRequest.getRecipientEmail();
    if (recipientEmail == null || recipientEmail.isBlank()) {
      recipientEmail = notificationRequest.getRecipient();
    }

    if (recipientEmail == null || recipientEmail.isBlank()) {
      log.warn("Cannot send notification: no recipient email provided");
      return;
    }

    if (notificationRequest.getProperties() != null && !notificationRequest.getProperties().isEmpty()) {
      sendHtmlNotification(notificationRequest, recipientEmail);
    } else {
      sendPlainTextNotification(notificationRequest, recipientEmail);
    }
  }

  private void sendHtmlNotification(NotificationRequest notificationRequest, String recipientEmail) {
    try {
      MimeMessage message = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true);

      helper.setTo(recipientEmail);
      helper.setSubject(
          notificationRequest.getSubject() != null
              ? notificationRequest.getSubject()
              : "PayNext Notification");

      Context context = new Context();
      context.setVariables(notificationRequest.getProperties());
      String htmlContent = templateEngine.process("email-template", context);
      helper.setText(htmlContent, true);

      mailSender.send(message);
      log.info("HTML email notification sent to {}", recipientEmail);
    } catch (MailException | jakarta.mail.MessagingException e) {
      log.error("Failed to send HTML email to {}: {}", recipientEmail, e.getMessage(), e);
      throw new RuntimeException("Failed to send HTML email notification", e);
    }
  }

  private void sendPlainTextNotification(NotificationRequest notificationRequest, String recipientEmail) {
    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(recipientEmail);
      message.setSubject(
          notificationRequest.getSubject() != null
              ? notificationRequest.getSubject()
              : "PayNext Notification");
      message.setText(
          notificationRequest.getMessage() != null
              ? notificationRequest.getMessage()
              : "You have a new notification from PayNext.");
      mailSender.send(message);
      log.info("Plain text email notification sent to {}", recipientEmail);
    } catch (MailException e) {
      log.error("Failed to send plain text email to {}: {}", recipientEmail, e.getMessage(), e);
      throw new RuntimeException("Failed to send plain text email notification", e);
    }
  }
}
