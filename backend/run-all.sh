#!/bin/bash
# =============================================================================
# PayNext — Start / Stop all services
# =============================================================================
set -e
ROOT=$(dirname "$(realpath "$0")")

case "$1" in
  start|up)
    echo "Starting all PayNext services ..."
    docker-compose -f "$ROOT/docker-compose.yml" up --build -d
    echo ""
    echo "Service endpoints:"
    echo "  Eureka Dashboard           : http://localhost:8001"
    echo "  API Gateway                : http://localhost:8002"
    echo "  User Service               : http://localhost:8003/actuator/health"
    echo "  Payment Service            : http://localhost:8004/actuator/health"
    echo "  Notification Service       : http://localhost:8005/actuator/health"
    echo "  Fraud Detection Service    : http://localhost:9001/health  (Python/ML)"
    echo "  Anomaly Detection Service  : http://localhost:9002/health"
    echo "  Churn Prediction Service   : http://localhost:9003/health"
    echo "  Recommendation Service     : http://localhost:9004/health"
    echo "  Categorization Service     : http://localhost:9005/health"
    echo "  Credit Scoring Service     : http://localhost:9006/health"
    echo "  Data Analytics Service     : http://localhost:9007/health"
    ;;
  stop|down)
    docker-compose -f "$ROOT/docker-compose.yml" down
    ;;
  logs)
    docker-compose -f "$ROOT/docker-compose.yml" logs -f "${2:-}"
    ;;
  *)
    echo "Usage: $0 {start|stop|logs [service-name]}"
    exit 1
    ;;
esac
