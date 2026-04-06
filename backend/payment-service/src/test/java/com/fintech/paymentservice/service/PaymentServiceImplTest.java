package com.fintech.paymentservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import com.fintech.paymentservice.client.NotificationClient;
import com.fintech.paymentservice.client.UserClient;
import com.fintech.paymentservice.dto.UserDTO;
import com.fintech.paymentservice.model.NotificationRequest;
import com.fintech.paymentservice.model.Payment;
import com.fintech.paymentservice.repository.PaymentRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class PaymentServiceImplTest {

  @Mock private PaymentRepository paymentRepository;
  @Mock private NotificationClient notificationClient;
  @Mock private UserClient userClient;

  @InjectMocks private PaymentServiceImpl paymentService;

  private Payment testPayment;

  @BeforeEach
  void setUp() {
    testPayment = new Payment();
    testPayment.setUserId(100L);
    testPayment.setAmount(new BigDecimal("100.00"));
    testPayment.setPaymentDate(LocalDateTime.now());
    testPayment.setStatus("COMPLETED");
  }

  @Test
  void processPayment_shouldSaveAndNotify() {
    when(paymentRepository.save(any(Payment.class))).thenAnswer(inv -> {
      Payment p = inv.getArgument(0);
      p.setId(1L);
      return p;
    });
    when(userClient.getUserById(anyLong()))
        .thenReturn(new UserDTO(100L, "Test User", "user@example.com"));
    when(notificationClient.sendNotification(any(NotificationRequest.class)))
        .thenReturn(ResponseEntity.ok().build());

    Payment result = paymentService.processPayment(testPayment);

    assertNotNull(result);
    assertNotNull(result.getId());
    assertEquals(testPayment.getUserId(), result.getUserId());
    verify(paymentRepository).save(testPayment);
    verify(notificationClient).sendNotification(any(NotificationRequest.class));
  }

  @Test
  void processPayment_withNullDate_shouldDefaultDate() {
    testPayment.setPaymentDate(null);
    when(paymentRepository.save(any(Payment.class))).thenAnswer(inv -> inv.getArgument(0));
    when(userClient.getUserById(anyLong()))
        .thenReturn(new UserDTO(100L, "Test User", "user@example.com"));
    when(notificationClient.sendNotification(any())).thenReturn(ResponseEntity.ok().build());

    Payment result = paymentService.processPayment(testPayment);

    assertNotNull(result.getPaymentDate());
  }

  @Test
  void processPayment_whenNotificationFails_shouldStillReturnPayment() {
    when(paymentRepository.save(any(Payment.class))).thenAnswer(inv -> {
      Payment p = inv.getArgument(0);
      p.setId(1L);
      return p;
    });
    when(userClient.getUserById(anyLong()))
        .thenReturn(new UserDTO(100L, "Test User", "user@example.com"));
    when(notificationClient.sendNotification(any()))
        .thenThrow(new RuntimeException("Notification unavailable"));

    Payment result = paymentService.processPayment(testPayment);

    assertNotNull(result);
    assertNotNull(result.getId());
  }

  @Test
  void processPayment_whenUserServiceFails_shouldStillNotify() {
    when(paymentRepository.save(any(Payment.class))).thenAnswer(inv -> {
      Payment p = inv.getArgument(0);
      p.setId(1L);
      return p;
    });
    when(userClient.getUserById(anyLong()))
        .thenThrow(new RuntimeException("User service down"));
    when(notificationClient.sendNotification(any())).thenReturn(ResponseEntity.ok().build());

    Payment result = paymentService.processPayment(testPayment);

    assertNotNull(result);
    verify(notificationClient).sendNotification(any(NotificationRequest.class));
  }

  @Test
  void getAllPayments_shouldReturnList() {
    Payment second = new Payment();
    second.setId(2L);
    second.setUserId(200L);
    second.setAmount(new BigDecimal("200.00"));
    second.setPaymentDate(LocalDateTime.now());
    second.setStatus("PENDING");

    when(paymentRepository.findAll()).thenReturn(Arrays.asList(testPayment, second));

    List<Payment> result = paymentService.getAllPayments();

    assertEquals(2, result.size());
    verify(paymentRepository).findAll();
  }

  @Test
  void getPaymentById_whenFound_shouldReturn() {
    testPayment.setId(1L);
    when(paymentRepository.findById(1L)).thenReturn(Optional.of(testPayment));

    Payment found = paymentService.getPaymentById(1L);

    assertNotNull(found);
    assertEquals(1L, found.getId());
  }

  @Test
  void getPaymentById_whenNotFound_shouldReturnNull() {
    when(paymentRepository.findById(999L)).thenReturn(Optional.empty());

    assertNull(paymentService.getPaymentById(999L));
  }
}
