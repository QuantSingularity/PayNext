package com.fintech.paymentservice.service;

import com.fintech.paymentservice.client.NotificationClient;
import com.fintech.paymentservice.model.NotificationRequest;
import com.fintech.paymentservice.model.Payment;
import com.fintech.paymentservice.repository.PaymentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class PaymentServiceImpl implements PaymentService {

  @Autowired private PaymentRepository paymentRepository;

  @Autowired private NotificationClient notificationClient;

  @Override
  public Payment processPayment(Payment payment) {
    if (payment.getPaymentDate() == null) {
      payment.setPaymentDate(LocalDateTime.now());
    }
    if (payment.getStatus() == null || payment.getStatus().isBlank()) {
      payment.setStatus("PENDING");
    }

    Payment savedPayment = paymentRepository.save(payment);

    try {
      NotificationRequest notificationRequest =
          new NotificationRequest(
              String.valueOf(payment.getUserId()),
              "Your payment of " + payment.getAmount() + " has been processed successfully.");
      notificationClient.sendNotification(notificationRequest);
    } catch (Exception e) {
      log.warn("Failed to send payment notification for payment id {}: {}", savedPayment.getId(), e.getMessage());
    }

    return savedPayment;
  }

  @Override
  @Transactional(readOnly = true)
  public List<Payment> getAllPayments() {
    return paymentRepository.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public Payment getPaymentById(Long id) {
    Optional<Payment> payment = paymentRepository.findById(id);
    return payment.orElse(null);
  }
}
