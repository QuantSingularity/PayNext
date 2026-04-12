package com.fintech.notificationservice.controller;

import com.fintech.notificationservice.model.NotificationRequest;
import com.fintech.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/notifications")
public class NotificationController {

  private final NotificationService notificationService;

  @Autowired
  public NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  @PostMapping("/send")
  public ResponseEntity<Void> sendNotification(@RequestBody NotificationRequest notificationRequest) {
    try {
      notificationService.sendNotification(notificationRequest);
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      log.error("Failed to send notification: {}", e.getMessage(), e);
      return ResponseEntity.internalServerError().build();
    }
  }
}
