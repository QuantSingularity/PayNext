"""
Kafka event publisher for the Fraud Detection Service.
Publishes analysis results to 'fraud-analysis-results' so downstream
services (notification-service, payment-service) can react.
Falls back silently when Kafka is unavailable.
"""

import json
import logging
import os
from typing import Any, Dict

logger = logging.getLogger(__name__)

_BOOTSTRAP = os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092")
_TOPIC = "fraud-analysis-results"

_producer = None


def _get_producer():
    global _producer
    if _producer is not None:
        return _producer
    try:
        from kafka import KafkaProducer

        _producer = KafkaProducer(
            bootstrap_servers=_BOOTSTRAP.split(","),
            value_serializer=lambda v: json.dumps(v, default=str).encode("utf-8"),
            key_serializer=lambda k: k.encode("utf-8") if k else None,
            request_timeout_ms=5_000,
            retries=3,
        )
        logger.info("Kafka producer connected to %s", _BOOTSTRAP)
    except Exception as exc:
        logger.warning("Kafka unavailable (%s). Events will not be published.", exc)
        _producer = None
    return _producer


def publish_analysis(payload: Dict[str, Any]) -> None:
    """Publish a fraud analysis result. Silently no-ops if Kafka is down."""
    p = _get_producer()
    if p is None:
        return
    try:
        key = payload.get("transaction_id", "unknown")
        p.send(_TOPIC, key=key, value=payload)
        p.flush(timeout=3)
        logger.debug("Kafka event published for transaction %s", key)
    except Exception as exc:
        logger.error("Kafka publish failed: %s", exc)
