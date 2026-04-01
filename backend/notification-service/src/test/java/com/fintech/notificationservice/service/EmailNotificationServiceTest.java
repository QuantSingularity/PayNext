package com.fintech.notificationservice.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.fintech.notificationservice.model.NotificationRequest;
import jakarta.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.thymeleaf.TemplateEngine;

@ExtendWith(MockitoExtension.class)
class EmailNotificationServiceTest {

  @Mock private JavaMailSender mailSender;
  @Mock private TemplateEngine templateEngine;
  @Mock private MimeMessage mimeMessage;

  @InjectMocks private EmailNotificationService emailNotificationService;

  private NotificationRequest htmlRequest;
  private NotificationRequest plainRequest;

  @BeforeEach
  void setUp() {
    htmlRequest = new NotificationRequest();
    htmlRequest.setRecipientEmail("test@example.com");
    htmlRequest.setSubject("Test Subject");
    Map<String, Object> properties = new HashMap<>();
    properties.put("message", "Test message body");
    htmlRequest.setProperties(properties);

    plainRequest = new NotificationRequest();
    plainRequest.setRecipientEmail("test@example.com");
    plainRequest.setSubject("Test Subject");
    plainRequest.setMessage("Plain text message");
  }

  @Test
  void sendNotification_withProperties_shouldSendHtmlEmail() {
    when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
    when(templateEngine.process(anyString(), any())).thenReturn("<html><body>Test</body></html>");
    doNothing().when(mailSender).send(any(MimeMessage.class));

    emailNotificationService.sendNotification(htmlRequest);

    verify(mailSender).createMimeMessage();
    verify(mailSender).send(any(MimeMessage.class));
    verify(templateEngine).process(anyString(), any());
  }

  @Test
  void sendNotification_withoutProperties_shouldSendPlainEmail() {
    doNothing().when(mailSender).send(any(SimpleMailMessage.class));

    emailNotificationService.sendNotification(plainRequest);

    verify(mailSender).send(any(SimpleMailMessage.class));
    verify(mailSender, never()).createMimeMessage();
    verify(templateEngine, never()).process(anyString(), any());
  }

  @Test
  void sendNotification_withNullRecipient_shouldNotSend() {
    NotificationRequest badRequest = new NotificationRequest();

    emailNotificationService.sendNotification(badRequest);

    verify(mailSender, never()).send(any(SimpleMailMessage.class));
    verify(mailSender, never()).createMimeMessage();
  }
}
