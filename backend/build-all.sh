#!/bin/bash
set -e

SERVICES=(
    "common-module"
    "eureka-server"
    "api-gateway"
    "user-service"
    "payment-service"
    "notification-service"
    "fraud-detection-service"
)

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

is_valid_service() {
    local SERVICE=$1
    for S in "${SERVICES[@]}"; do
        [[ "$S" == "$SERVICE" ]] && return 0
    done
    return 1
}

build_service() {
    local SERVICE=$1
    echo "----------------------------------------"
    echo "Building $SERVICE..."
    cd "$BASE_DIR/$SERVICE" || { echo "Directory not found: $BASE_DIR/$SERVICE"; exit 1; }
    mvn clean package -DskipTests
    echo "$SERVICE built successfully."
    cd "$BASE_DIR"
}

build_all_services() {
    for SERVICE in "${SERVICES[@]}"; do
        build_service "$SERVICE"
    done
    echo "========================================"
    echo "All services built successfully."
    echo "========================================"
}

usage() {
    echo "Usage: $0 [service_name]"
    echo ""
    echo "Available services:"
    for S in "${SERVICES[@]}"; do echo "  - $S"; done
    exit 1
}

if ! command -v mvn &>/dev/null; then
    echo "'mvn' not found. Please install Maven."
    exit 1
fi

if [ $# -gt 1 ]; then usage; fi

if [ $# -eq 1 ]; then
    if is_valid_service "$1"; then
        build_service "$1"
    else
        echo "Invalid service: $1"
        usage
    fi
else
    build_all_services
fi
