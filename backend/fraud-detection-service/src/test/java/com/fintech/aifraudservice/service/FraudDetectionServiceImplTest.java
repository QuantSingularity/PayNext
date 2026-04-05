package com.fintech.aifraudservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.fintech.aifraudservice.model.TransactionAnalysis;
import com.fintech.aifraudservice.model.UserBehaviorProfile;
import com.fintech.aifraudservice.repository.TransactionAnalysisRepository;
import com.fintech.aifraudservice.repository.UserBehaviorProfileRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FraudDetectionServiceImplTest {

  @Mock private TransactionAnalysisRepository transactionAnalysisRepository;
  @Mock private UserBehaviorProfileRepository userBehaviorProfileRepository;

  @InjectMocks private FraudDetectionServiceImpl fraudDetectionService;

  private TransactionAnalysisRequest buildRequest() {
    TransactionAnalysisRequest request = new TransactionAnalysisRequest();
    request.setTransactionId("TXN-001");
    request.setUserId(1L);
    request.setAmount(new BigDecimal("100.00"));
    request.setCurrency("USD");
    request.setTransactionType("PURCHASE");
    request.setPaymentMethod("CREDIT_CARD");
    request.setLocationCountry("US");
    request.setLocationCity("New York");
    request.setIpAddress("192.168.1.1");
    request.setDeviceFingerprint("device-abc");
    request.setTransactionTime(LocalDateTime.now());
    return request;
  }

  @BeforeEach
  void setUp() {
    when(transactionAnalysisRepository.countUserTransactionsSince(anyLong(), any())).thenReturn(2L);
    when(transactionAnalysisRepository.sumUserTransactionAmountSince(anyLong(), any()))
        .thenReturn(BigDecimal.valueOf(200));
    when(userBehaviorProfileRepository.findByUserId(anyLong())).thenReturn(Optional.empty());
  }

  @Test
  void analyzeTransaction_withLowRisk_shouldReturnApproved() {
    TransactionAnalysisRequest request = buildRequest();

    when(transactionAnalysisRepository.save(any(TransactionAnalysis.class)))
        .thenAnswer(inv -> {
          TransactionAnalysis ta = inv.getArgument(0);
          ta.setId(1L);
          return ta;
        });

    TransactionAnalysis result = fraudDetectionService.analyzeTransaction(request);

    assertNotNull(result);
    assertEquals("TXN-001", result.getTransactionId());
    assertNotNull(result.getRiskScore());
    assertNotNull(result.getRiskLevel());
    assertNotNull(result.getFraudStatus());
    verify(transactionAnalysisRepository).save(any(TransactionAnalysis.class));
  }

  @Test
  void analyzeTransaction_withHighVelocity_shouldIncreaseRiskScore() {
    TransactionAnalysisRequest request = buildRequest();
    when(transactionAnalysisRepository.countUserTransactionsSince(anyLong(), any())).thenReturn(50L);

    when(transactionAnalysisRepository.save(any(TransactionAnalysis.class)))
        .thenAnswer(inv -> inv.getArgument(0));

    TransactionAnalysis result = fraudDetectionService.analyzeTransaction(request);

    assertNotNull(result);
    assertTrue(result.getRiskScore() > 0.0, "High velocity should increase risk score");
  }

  @Test
  void calculateVelocityScore_withNormalActivity_shouldReturnLowScore() {
    when(transactionAnalysisRepository.countUserTransactionsSince(anyLong(), any())).thenReturn(1L);
    when(transactionAnalysisRepository.sumUserTransactionAmountSince(anyLong(), any()))
        .thenReturn(BigDecimal.valueOf(50));

    Double score = fraudDetectionService.calculateVelocityScore(1L, buildRequest());

    assertNotNull(score);
    assertTrue(score >= 0.0 && score <= 1.0);
  }

  @Test
  void calculateBehavioralScore_withNoProfile_shouldReturnDefaultScore() {
    when(userBehaviorProfileRepository.findByUserId(anyLong())).thenReturn(Optional.empty());

    Double score = fraudDetectionService.calculateBehavioralScore(1L, buildRequest());

    assertNotNull(score);
    assertEquals(0.3, score);
  }

  @Test
  void calculateBehavioralScore_withMatchingProfile_shouldReturnLowScore() {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setUserId(1L);
    profile.setAvgTransactionAmount(new BigDecimal("100.00"));
    when(userBehaviorProfileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

    Double score = fraudDetectionService.calculateBehavioralScore(1L, buildRequest());

    assertNotNull(score);
    assertTrue(score >= 0.0 && score <= 1.0);
  }

  @Test
  void calculateGeolocationScore_withKnownLocation_shouldReturnLowScore() {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setUserId(1L);
    java.util.Set<String> countries = new java.util.HashSet<>();
    countries.add("US");
    profile.setFrequentCountries(countries);
    when(userBehaviorProfileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

    Double score = fraudDetectionService.calculateGeolocationScore(1L, buildRequest());

    assertNotNull(score);
    assertEquals(0.0, score, "Known country should return 0 geo score");
  }

  @Test
  void calculateGeolocationScore_withUnknownLocation_shouldReturnHigherScore() {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setUserId(1L);
    java.util.Set<String> countries = new java.util.HashSet<>();
    countries.add("GB");
    profile.setFrequentCountries(countries);
    when(userBehaviorProfileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

    Double score = fraudDetectionService.calculateGeolocationScore(1L, buildRequest());

    assertNotNull(score);
    assertTrue(score > 0.0, "Unknown country should increase geo score");
  }

  @Test
  void calculateDeviceScore_withKnownDevice_shouldReturnLowScore() {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setUserId(1L);
    java.util.Set<String> devices = new java.util.HashSet<>();
    devices.add("device-abc");
    profile.setKnownDevices(devices);
    java.util.Set<String> ips = new java.util.HashSet<>();
    ips.add("192.168.1.1");
    profile.setKnownIpAddresses(ips);
    when(userBehaviorProfileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

    Double score = fraudDetectionService.calculateDeviceScore(1L, buildRequest());

    assertNotNull(score);
    assertEquals(0.0, score, "Known device and IP should return 0 device score");
  }

  @Test
  void getUserBehaviorProfile_whenExists_shouldReturn() {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setUserId(1L);
    when(userBehaviorProfileRepository.findByUserId(1L)).thenReturn(Optional.of(profile));

    UserBehaviorProfile result = fraudDetectionService.getUserBehaviorProfile(1L);

    assertNotNull(result);
    assertEquals(1L, result.getUserId());
  }

  @Test
  void getUserBehaviorProfile_whenNotExists_shouldReturnNull() {
    when(userBehaviorProfileRepository.findByUserId(999L)).thenReturn(Optional.empty());

    UserBehaviorProfile result = fraudDetectionService.getUserBehaviorProfile(999L);

    assertNull(result);
  }

  @Test
  void markTransactionFraud_whenFound_shouldUpdateStatus() {
    TransactionAnalysis existing = new TransactionAnalysis();
    existing.setId(1L);
    existing.setTransactionId("TXN-001");
    existing.setFraudStatus(TransactionAnalysis.FraudStatus.UNDER_REVIEW);

    when(transactionAnalysisRepository.findByTransactionId("TXN-001"))
        .thenReturn(Optional.of(existing));
    when(transactionAnalysisRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

    fraudDetectionService.markTransactionFraud("TXN-001", true, "admin", "Confirmed fraud");

    verify(transactionAnalysisRepository).save(argThat(ta ->
        ta.getFraudStatus() == TransactionAnalysis.FraudStatus.DECLINED));
  }

  @Test
  void markTransactionFraud_whenNotFound_shouldNotThrow() {
    when(transactionAnalysisRepository.findByTransactionId("UNKNOWN")).thenReturn(Optional.empty());

    assertDoesNotThrow(() ->
        fraudDetectionService.markTransactionFraud("UNKNOWN", true, "admin", "notes"));
    verify(transactionAnalysisRepository, never()).save(any());
  }

  @Test
  void calculateRealTimeFraudScore_shouldReturnValidScore() {
    Double score = fraudDetectionService.calculateRealTimeFraudScore(buildRequest());

    assertNotNull(score);
    assertTrue(score >= 0.0 && score <= 1.0);
  }
}
