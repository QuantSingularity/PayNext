package com.fintech.paymentservice.client;

import com.fintech.paymentservice.model.NotificationRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
    name = "notification-service",
    fallback = NotificationClient.NotificationClientFallback.class)
public interface NotificationClient {

  @PostMapping("/notifications/send")
  ResponseEntity<Void> sendNotification(@RequestBody NotificationRequest notificationRequest);

  @Component
  class NotificationClientFallback implements NotificationClient {
    private static final Logger logger = LoggerFactory.getLogger(NotificationClientFallback.class);

    @Override
    public ResponseEntity<Void> sendNotification(NotificationRequest notificationRequest) {
      logger.warn(
          "Notification service unavailable. Fallback triggered for recipient: {}",
          notificationRequest.getRecipient());
      return ResponseEntity.ok().build();
    }
  }
}
