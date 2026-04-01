package com.fintech.aifraudservice.service;

import com.fintech.aifraudservice.model.TransactionAnalysis;
import com.fintech.aifraudservice.model.UserBehaviorProfile;
import com.fintech.aifraudservice.repository.TransactionAnalysisRepository;
import com.fintech.aifraudservice.repository.UserBehaviorProfileRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
public class FraudDetectionServiceImpl implements FraudDetectionService {

  @Autowired private TransactionAnalysisRepository transactionAnalysisRepository;

  @Autowired private UserBehaviorProfileRepository userBehaviorProfileRepository;

  @Autowired(required = false)
  private KafkaTemplate<String, Object> kafkaTemplate;

  private static final double VELOCITY_WEIGHT = 0.25;
  private static final double BEHAVIORAL_WEIGHT = 0.20;
  private static final double GEOLOCATION_WEIGHT = 0.15;
  private static final double DEVICE_WEIGHT = 0.15;
  private static final double AMOUNT_WEIGHT = 0.15;
  private static final double TIME_WEIGHT = 0.10;

  @Override
  public TransactionAnalysis analyzeTransaction(TransactionAnalysisRequest request) {
    long startTime = System.currentTimeMillis();

    try {
      log.info("Starting fraud analysis for transaction: {}", request.getTransactionId());

      Double velocityScore = calculateVelocityScore(request.getUserId(), request);
      Double behavioralScore = calculateBehavioralScore(request.getUserId(), request);
      Double geolocationScore = calculateGeolocationScore(request.getUserId(), request);
      Double deviceScore = calculateDeviceScore(request.getUserId(), request);
      Double amountScore = calculateAmountScore(request.getUserId(), request);
      Double timeScore = calculateTimeOfDayScore(request.getUserId(), request);

      Double overallRiskScore =
          calculateOverallRiskScore(
              velocityScore, behavioralScore, geolocationScore, deviceScore, amountScore, timeScore);

      TransactionAnalysis.RiskLevel riskLevel = determineRiskLevel(overallRiskScore);

      TransactionAnalysis analysis = new TransactionAnalysis();
      analysis.setTransactionId(request.getTransactionId());
      analysis.setUserId(request.getUserId());
      analysis.setAmount(request.getAmount());
      analysis.setCurrency(request.getCurrency());
      analysis.setMerchantId(request.getMerchantId());
      analysis.setMerchantCategory(request.getMerchantCategory());
      analysis.setTransactionType(request.getTransactionType());
      analysis.setPaymentMethod(request.getPaymentMethod());
      analysis.setIpAddress(request.getIpAddress());
      analysis.setDeviceFingerprint(request.getDeviceFingerprint());
      analysis.setLocationCountry(request.getLocationCountry());
      analysis.setLocationCity(request.getLocationCity());
      analysis.setRiskScore(overallRiskScore);
      analysis.setRiskLevel(riskLevel);
      analysis.setVelocityScore(velocityScore);
      analysis.setBehavioralScore(behavioralScore);
      analysis.setGeolocationScore(geolocationScore);
      analysis.setDeviceScore(deviceScore);
      analysis.setAmountScore(amountScore);
      analysis.setTimeOfDayScore(timeScore);
      analysis.setMlModelVersion("v1.0");
      analysis.setAnalysisDurationMs(System.currentTimeMillis() - startTime);

      Map<String, String> indicators = generateFraudIndicators(request, analysis);
      analysis.setFraudIndicators(indicators);

      if (riskLevel == TransactionAnalysis.RiskLevel.CRITICAL) {
        analysis.setFraudStatus(TransactionAnalysis.FraudStatus.DECLINED);
      } else if (riskLevel == TransactionAnalysis.RiskLevel.HIGH) {
        analysis.setFraudStatus(TransactionAnalysis.FraudStatus.UNDER_REVIEW);
      } else {
        analysis.setFraudStatus(TransactionAnalysis.FraudStatus.APPROVED);
      }

      analysis = transactionAnalysisRepository.save(analysis);
      updateUserBehaviorProfile(request, analysis);

      if (kafkaTemplate != null) {
        kafkaTemplate.send("fraud-analysis-results", analysis);
      }

      log.info(
          "Fraud analysis completed for transaction: {} with risk score: {} and level: {}",
          request.getTransactionId(), overallRiskScore, riskLevel);

      return analysis;

    } catch (Exception e) {
      log.error("Error analyzing transaction {}: {}", request.getTransactionId(), e.getMessage(), e);
      throw new RuntimeException("Fraud analysis failed", e);
    }
  }

  @Override
  public Double calculateRealTimeFraudScore(TransactionAnalysisRequest request) {
    try {
      Double velocityScore = calculateVelocityScore(request.getUserId(), request);
      Double behavioralScore = calculateBehavioralScore(request.getUserId(), request);
      Double geolocationScore = calculateGeolocationScore(request.getUserId(), request);
      Double deviceScore = calculateDeviceScore(request.getUserId(), request);
      Double amountScore = calculateAmountScore(request.getUserId(), request);
      Double timeScore = calculateTimeOfDayScore(request.getUserId(), request);
      return calculateOverallRiskScore(
          velocityScore, behavioralScore, geolocationScore, deviceScore, amountScore, timeScore);
    } catch (Exception e) {
      log.error("Error calculating real-time fraud score: {}", e.getMessage(), e);
      return 0.5;
    }
  }

  @Override
  public Double calculateVelocityScore(Long userId, TransactionAnalysisRequest request) {
    try {
      LocalDateTime now = LocalDateTime.now();
      LocalDateTime oneHourAgo = now.minusHours(1);
      LocalDateTime oneDayAgo = now.minusDays(1);

      Long transactionsLastHour =
          transactionAnalysisRepository.countUserTransactionsSince(userId, oneHourAgo);
      Long transactionsLastDay =
          transactionAnalysisRepository.countUserTransactionsSince(userId, oneDayAgo);

      BigDecimal amountLastHour =
          transactionAnalysisRepository.sumUserTransactionAmountSince(userId, oneHourAgo);
      BigDecimal amountLastDay =
          transactionAnalysisRepository.sumUserTransactionAmountSince(userId, oneDayAgo);

      if (amountLastHour == null) amountLastHour = BigDecimal.ZERO;
      if (amountLastDay == null) amountLastDay = BigDecimal.ZERO;

      UserBehaviorProfile profile = getUserBehaviorProfile(userId);
      double velocityScore = 0.0;

      if (profile != null && profile.getDailyTransactionCount() != null) {
        double normalDailyCount = profile.getDailyTransactionCount();
        double normalHourlyCount = normalDailyCount / 24.0;

        if (transactionsLastHour > normalHourlyCount * 3) {
          velocityScore += 0.4;
        } else if (transactionsLastHour > normalHourlyCount * 2) {
          velocityScore += 0.2;
        }
        if (transactionsLastDay > normalDailyCount * 2) {
          velocityScore += 0.3;
        }
      } else {
        if (transactionsLastHour > 5) velocityScore += 0.4;
        if (transactionsLastDay > 20) velocityScore += 0.3;
      }

      if (profile != null && profile.getAvgTransactionAmount() != null) {
        BigDecimal normalDailyAmount =
            profile.getAvgTransactionAmount()
                .multiply(
                    BigDecimal.valueOf(
                        profile.getDailyTransactionCount() != null
                            ? profile.getDailyTransactionCount()
                            : 5));
        if (amountLastDay.compareTo(normalDailyAmount.multiply(BigDecimal.valueOf(3))) > 0) {
          velocityScore += 0.3;
        }
      }

      return Math.min(velocityScore, 1.0);

    } catch (Exception e) {
      log.error("Error calculating velocity score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  @Override
  public Double calculateBehavioralScore(Long userId, TransactionAnalysisRequest request) {
    try {
      UserBehaviorProfile profile = getUserBehaviorProfile(userId);
      if (profile == null) return 0.3;

      double behavioralScore = 0.0;

      if (profile.getAvgTransactionAmount() != null) {
        BigDecimal avgAmount = profile.getAvgTransactionAmount();
        if (avgAmount.compareTo(BigDecimal.ZERO) > 0) {
          double ratio =
              request
                  .getAmount()
                  .divide(avgAmount, 2, java.math.RoundingMode.HALF_UP)
                  .doubleValue();
          if (ratio > 10) behavioralScore += 0.4;
          else if (ratio > 5) behavioralScore += 0.2;
        }
      }

      if (profile.getFrequentCategories() != null
          && !profile.getFrequentCategories().isEmpty()
          && request.getMerchantCategory() != null
          && !profile.getFrequentCategories().contains(request.getMerchantCategory())) {
        behavioralScore += 0.2;
      }

      if (profile.getPreferredPaymentMethods() != null
          && !profile.getPreferredPaymentMethods().isEmpty()
          && request.getPaymentMethod() != null
          && !profile.getPreferredPaymentMethods().contains(request.getPaymentMethod())) {
        behavioralScore += 0.15;
      }

      if (request.getTransactionTime() != null
          && profile.getTypicalStartTime() != null
          && profile.getTypicalEndTime() != null) {
        LocalTime currentTime = request.getTransactionTime().toLocalTime();
        if (currentTime.isBefore(profile.getTypicalStartTime())
            || currentTime.isAfter(profile.getTypicalEndTime())) {
          behavioralScore += 0.25;
        }
      }

      return Math.min(behavioralScore, 1.0);

    } catch (Exception e) {
      log.error("Error calculating behavioral score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  @Override
  public Double calculateGeolocationScore(Long userId, TransactionAnalysisRequest request) {
    try {
      UserBehaviorProfile profile = getUserBehaviorProfile(userId);
      if (profile == null) return 0.2;

      double geoScore = 0.0;

      if (profile.getFrequentCountries() != null
          && !profile.getFrequentCountries().isEmpty()
          && request.getLocationCountry() != null
          && !profile.getFrequentCountries().contains(request.getLocationCountry())) {
        geoScore += 0.5;
      }

      if (profile.getFrequentCities() != null
          && !profile.getFrequentCities().isEmpty()
          && request.getLocationCity() != null
          && !profile.getFrequentCities().contains(request.getLocationCity())) {
        geoScore += 0.3;
      }

      Set<String> highRiskCountries = Set.of("XX", "YY", "ZZ");
      if (request.getLocationCountry() != null
          && highRiskCountries.contains(request.getLocationCountry())) {
        geoScore += 0.4;
      }

      return Math.min(geoScore, 1.0);

    } catch (Exception e) {
      log.error("Error calculating geolocation score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  @Override
  public Double calculateDeviceScore(Long userId, TransactionAnalysisRequest request) {
    try {
      UserBehaviorProfile profile = getUserBehaviorProfile(userId);
      if (profile == null) return 0.2;

      double deviceScore = 0.0;

      if (profile.getKnownDevices() != null
          && !profile.getKnownDevices().isEmpty()
          && request.getDeviceFingerprint() != null
          && !profile.getKnownDevices().contains(request.getDeviceFingerprint())) {
        deviceScore += 0.4;
      }

      if (profile.getKnownIpAddresses() != null
          && !profile.getKnownIpAddresses().isEmpty()
          && request.getIpAddress() != null
          && !profile.getKnownIpAddresses().contains(request.getIpAddress())) {
        deviceScore += 0.3;
      }

      return Math.min(deviceScore, 1.0);

    } catch (Exception e) {
      log.error("Error calculating device score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  private Double calculateAmountScore(Long userId, TransactionAnalysisRequest request) {
    try {
      UserBehaviorProfile profile = getUserBehaviorProfile(userId);
      BigDecimal amount = request.getAmount();

      if (profile == null) {
        if (amount.compareTo(BigDecimal.valueOf(10000)) > 0) return 0.8;
        if (amount.compareTo(BigDecimal.valueOf(5000)) > 0) return 0.5;
        if (amount.compareTo(BigDecimal.valueOf(1000)) > 0) return 0.2;
        return 0.0;
      }

      BigDecimal maxAmount = profile.getMaxTransactionAmount();
      BigDecimal avgAmount = profile.getAvgTransactionAmount();

      if (maxAmount != null
          && amount.compareTo(maxAmount.multiply(BigDecimal.valueOf(2))) > 0) {
        return 0.8;
      } else if (maxAmount != null && amount.compareTo(maxAmount) > 0) {
        return 0.5;
      } else if (avgAmount != null
          && avgAmount.compareTo(BigDecimal.ZERO) > 0
          && amount.compareTo(avgAmount.multiply(BigDecimal.valueOf(5))) > 0) {
        return 0.4;
      }
      return 0.0;

    } catch (Exception e) {
      log.error("Error calculating amount score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  private Double calculateTimeOfDayScore(Long userId, TransactionAnalysisRequest request) {
    try {
      if (request.getTransactionTime() == null) return 0.0;
      LocalTime currentTime = request.getTransactionTime().toLocalTime();
      if (currentTime.isAfter(LocalTime.of(23, 0)) || currentTime.isBefore(LocalTime.of(6, 0))) {
        return 0.3;
      }
      return 0.0;
    } catch (Exception e) {
      log.error("Error calculating time score for user {}: {}", userId, e.getMessage());
      return 0.0;
    }
  }

  private Double calculateOverallRiskScore(
      Double v, Double b, Double g, Double d, Double a, Double t) {
    return (v * VELOCITY_WEIGHT)
        + (b * BEHAVIORAL_WEIGHT)
        + (g * GEOLOCATION_WEIGHT)
        + (d * DEVICE_WEIGHT)
        + (a * AMOUNT_WEIGHT)
        + (t * TIME_WEIGHT);
  }

  private TransactionAnalysis.RiskLevel determineRiskLevel(Double riskScore) {
    if (riskScore >= 0.8) return TransactionAnalysis.RiskLevel.CRITICAL;
    if (riskScore >= 0.6) return TransactionAnalysis.RiskLevel.HIGH;
    if (riskScore >= 0.3) return TransactionAnalysis.RiskLevel.MEDIUM;
    return TransactionAnalysis.RiskLevel.LOW;
  }

  private Map<String, String> generateFraudIndicators(
      TransactionAnalysisRequest request, TransactionAnalysis analysis) {
    Map<String, String> indicators = new HashMap<>();
    if (analysis.getVelocityScore() != null && analysis.getVelocityScore() > 0.5)
      indicators.put("HIGH_VELOCITY", "Transaction velocity exceeds normal patterns");
    if (analysis.getBehavioralScore() != null && analysis.getBehavioralScore() > 0.5)
      indicators.put("BEHAVIORAL_ANOMALY", "Transaction behavior deviates from user patterns");
    if (analysis.getGeolocationScore() != null && analysis.getGeolocationScore() > 0.5)
      indicators.put("GEOLOCATION_RISK", "Transaction from unusual location");
    if (analysis.getDeviceScore() != null && analysis.getDeviceScore() > 0.5)
      indicators.put("DEVICE_RISK", "Transaction from unknown device");
    if (analysis.getAmountScore() != null && analysis.getAmountScore() > 0.5)
      indicators.put("AMOUNT_ANOMALY", "Transaction amount is unusually high");
    if (analysis.getTimeOfDayScore() != null && analysis.getTimeOfDayScore() > 0.2)
      indicators.put("TIME_RISK", "Transaction at unusual time");
    return indicators;
  }

  @Override
  @Cacheable(value = "userBehaviorProfiles", key = "#userId")
  public UserBehaviorProfile getUserBehaviorProfile(Long userId) {
    return userBehaviorProfileRepository.findByUserId(userId).orElse(null);
  }

  @Override
  public void updateUserBehaviorProfile(
      TransactionAnalysisRequest request, TransactionAnalysis analysis) {
    log.info("Updating behavior profile for user: {}", request.getUserId());
  }

  @Override
  public void retrainFraudModel() {
    log.info("Retraining fraud detection model");
  }

  @Override
  public Map<String, Object> getFraudDetectionStats() {
    Map<String, Object> stats = new HashMap<>();
    LocalDateTime last24Hours = LocalDateTime.now().minusDays(1);
    Long totalTransactions = transactionAnalysisRepository.countTransactionsSince(last24Hours);
    Long fraudTransactions = transactionAnalysisRepository.countFraudTransactionsSince(last24Hours);
    Long highRiskTransactions =
        transactionAnalysisRepository.countHighRiskTransactionsSince(last24Hours);
    stats.put("totalTransactions24h", totalTransactions);
    stats.put("fraudTransactions24h", fraudTransactions);
    stats.put("highRiskTransactions24h", highRiskTransactions);
    stats.put(
        "fraudRate24h",
        totalTransactions > 0 ? (fraudTransactions.doubleValue() / totalTransactions) * 100 : 0);
    return stats;
  }

  @Override
  public List<TransactionAnalysis> getHighRiskTransactions(int limit) {
    return transactionAnalysisRepository.findHighRiskTransactions(PageRequest.of(0, limit)).getContent();
  }

  @Override
  public void markTransactionFraud(
      String transactionId, boolean isFraud, String reviewedBy, String notes) {
    Optional<TransactionAnalysis> analysisOpt =
        transactionAnalysisRepository.findByTransactionId(transactionId);

    if (analysisOpt.isPresent()) {
      TransactionAnalysis analysis = analysisOpt.get();
      analysis.setFraudStatus(
          isFraud
              ? TransactionAnalysis.FraudStatus.DECLINED
              : TransactionAnalysis.FraudStatus.FALSE_POSITIVE);
      analysis.setReviewedBy(reviewedBy);
      analysis.setReviewedAt(LocalDateTime.now());
      analysis.setReviewNotes(notes);
      transactionAnalysisRepository.save(analysis);
      log.info(
          "Transaction {} marked as {} by {}",
          transactionId, isFraud ? "fraud" : "legitimate", reviewedBy);
    } else {
      log.warn("Transaction not found for review: {}", transactionId);
    }
  }
}
