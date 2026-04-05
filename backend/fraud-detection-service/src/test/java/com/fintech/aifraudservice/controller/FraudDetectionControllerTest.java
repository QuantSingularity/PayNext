package com.fintech.aifraudservice.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fintech.aifraudservice.model.TransactionAnalysis;
import com.fintech.aifraudservice.model.UserBehaviorProfile;
import com.fintech.aifraudservice.service.FraudDetectionService;
import com.fintech.aifraudservice.service.TransactionAnalysisRequest;
import java.math.BigDecimal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(FraudDetectionController.class)
class FraudDetectionControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockBean private FraudDetectionService fraudDetectionService;
  @Autowired private ObjectMapper objectMapper;

  private TransactionAnalysisRequest testRequest;
  private TransactionAnalysis testAnalysis;

  @BeforeEach
  void setUp() {
    testRequest = new TransactionAnalysisRequest();
    testRequest.setTransactionId("TXN-001");
    testRequest.setUserId(1L);
    testRequest.setAmount(new BigDecimal("100.00"));
    testRequest.setCurrency("USD");
    testRequest.setTransactionType("PURCHASE");
    testRequest.setPaymentMethod("CREDIT_CARD");

    testAnalysis = new TransactionAnalysis();
    testAnalysis.setId(1L);
    testAnalysis.setTransactionId("TXN-001");
    testAnalysis.setUserId(1L);
    testAnalysis.setAmount(new BigDecimal("100.00"));
    testAnalysis.setCurrency("USD");
    testAnalysis.setTransactionType("PURCHASE");
    testAnalysis.setPaymentMethod("CREDIT_CARD");
    testAnalysis.setRiskScore(0.2);
    testAnalysis.setRiskLevel(TransactionAnalysis.RiskLevel.LOW);
    testAnalysis.setFraudStatus(TransactionAnalysis.FraudStatus.APPROVED);
  }

  @Test
  @WithMockUser
  void analyzeTransaction_shouldReturnOk() throws Exception {
    when(fraudDetectionService.analyzeTransaction(any(TransactionAnalysisRequest.class)))
        .thenReturn(testAnalysis);

    mockMvc
        .perform(
            post("/api/fraud-detection/analyze")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.transactionId").value("TXN-001"))
        .andExpect(jsonPath("$.riskLevel").value("LOW"));
  }

  @Test
  @WithMockUser
  void getUserBehaviorProfile_whenFound_shouldReturnOk() throws Exception {
    UserBehaviorProfile profile = new UserBehaviorProfile();
    profile.setId(1L);
    profile.setUserId(1L);
    when(fraudDetectionService.getUserBehaviorProfile(1L)).thenReturn(profile);

    mockMvc
        .perform(get("/api/fraud-detection/user/1/profile"))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser
  void getUserBehaviorProfile_whenNotFound_shouldReturnNotFound() throws Exception {
    when(fraudDetectionService.getUserBehaviorProfile(999L)).thenReturn(null);

    mockMvc
        .perform(get("/api/fraud-detection/user/999/profile"))
        .andExpect(status().isNotFound());
  }
}
