package com.fintech.paymentservice.exception;

import java.time.LocalDateTime;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalArgument(
      IllegalArgumentException ex, WebRequest request) {
    return ResponseEntity.badRequest()
        .body(errorBody(HttpStatus.BAD_REQUEST, ex.getMessage(), request));
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<Map<String, Object>> handleRuntime(
      RuntimeException ex, WebRequest request) {
    log.error("Runtime error: {}", ex.getMessage(), ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(errorBody(HttpStatus.INTERNAL_SERVER_ERROR, "An internal error occurred", request));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> handleGeneral(Exception ex, WebRequest request) {
    log.error("Unexpected error: {}", ex.getMessage(), ex);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(errorBody(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred", request));
  }

  private Map<String, Object> errorBody(HttpStatus status, String message, WebRequest request) {
    return Map.of(
        "timestamp", LocalDateTime.now().toString(),
        "status", status.value(),
        "error", status.getReasonPhrase(),
        "message", message,
        "path", request.getDescription(false).replace("uri=", ""));
  }
}
