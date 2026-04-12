#!/usr/bin/env bash
# run-all.sh — start all PayNext services locally (non-Docker)
# Run from the project root (code/)
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$ROOT/backend"
ML="$ROOT/ml-services"

echo "=== PayNext — Starting all services ==="

# 1. Train ML models if needed
echo "[1/3] Training ML models (if required)..."
cd "$ML"
python train_all.py || echo "Warning: some ML models failed to train"

# 2. Build Java services
echo "[2/3] Building Java services..."
cd "$BACKEND"
mvn clean package -DskipTests -q

# 3. Launch everything via Docker Compose
echo "[3/3] Starting services via Docker Compose..."
cd "$ROOT"
docker-compose up --build -d

echo ""
echo "Services starting. Check health with: docker-compose ps"
