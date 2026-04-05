#!/bin/bash
# =============================================================================
# PayNext — Build All Services
# =============================================================================
set -e

ROOT=$(dirname "$(realpath "$0")")
echo "========================================"
echo "  Building PayNext Backend Services"
echo "========================================"

# ─── Java microservices ────────────────────────────────────────────────────
echo ""
echo "[1/2] Building Java microservices (Maven) ..."
cd "$ROOT"
mvn clean package -DskipTests
echo "Java build complete."

# ─── Python ML services ───────────────────────────────────────────────────
echo ""
echo "[2/2] Installing Python ML dependencies and training models ..."
pip install --quiet -r "$ROOT/ml-common/requirements.txt"
python "$ROOT/train_all.py"

echo ""
echo "========================================"
echo "  All builds complete."
echo "  Start the stack: ./run-all.sh start"
echo "========================================"
