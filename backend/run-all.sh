#!/bin/bash
# Run all services locally for development
# Requires each service JAR to be built first (run build-all.sh)

set -e
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROFILE="${SPRING_PROFILES_ACTIVE:-dev}"
LOG_DIR="$BASE_DIR/logs"
mkdir -p "$LOG_DIR"

start_service() {
    local NAME=$1
    local JAR=$2
    local PORT=$3
    echo "Starting $NAME on port $PORT..."
    java -jar \
        -Dspring.profiles.active="$PROFILE" \
        -Dserver.port="$PORT" \
        "$BASE_DIR/$NAME/target/$JAR" \
        > "$LOG_DIR/$NAME.log" 2>&1 &
    echo "$NAME PID: $!"
}

start_service "eureka-server"          "eureka-server-1.0.0.jar"             8001
sleep 10

start_service "api-gateway"            "api-gateway-1.0.0.jar"               8002
start_service "user-service"           "user-service-1.0.0.jar"              8003
start_service "payment-service"        "payment-service-1.0.0.jar"           8004
start_service "notification-service"   "notification-service-1.0.0.jar"      8005
start_service "fraud-detection-service" "ai-fraud-detection-service-1.0.0.jar" 8006

echo ""
echo "All services started. Logs in $LOG_DIR/"
echo "Press Ctrl+C to stop watching logs."
wait
