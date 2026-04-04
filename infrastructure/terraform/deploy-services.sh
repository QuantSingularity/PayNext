#!/bin/bash
# =====================================================
# PayNext Kubernetes Service Deployment Script
# Deploys all services via Helm chart
# =====================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HELM_CHART_DIR="${SCRIPT_DIR}/../kubernetes"
NAMESPACE="${NAMESPACE:-paynext}"
RELEASE_NAME="${RELEASE_NAME:-paynext}"
ENVIRONMENT="${ENVIRONMENT:-dev}"
VALUES_FILE="${HELM_CHART_DIR}/values.yaml"
TIMEOUT="${HELM_TIMEOUT:-10m}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()   { echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"; }
warn()  { echo -e "${YELLOW}[$(date +'%H:%M:%S')] WARNING: $1${NC}"; }
error() { echo -e "${RED}[$(date +'%H:%M:%S')] ERROR: $1${NC}"; exit 1; }

# Check prerequisites
check_prerequisites() {
    local missing=()
    for tool in kubectl helm; do
        command -v "$tool" &>/dev/null || missing+=("$tool")
    done
    [[ ${#missing[@]} -gt 0 ]] && error "Missing tools: ${missing[*]}"

    kubectl cluster-info &>/dev/null || error "Cannot connect to Kubernetes cluster. Check KUBECONFIG."
    log "Prerequisites OK"
}

# Create namespace if it doesn't exist
ensure_namespace() {
    if ! kubectl get namespace "$NAMESPACE" &>/dev/null; then
        log "Creating namespace: $NAMESPACE"
        kubectl create namespace "$NAMESPACE"
        kubectl label namespace "$NAMESPACE" \
            environment="$ENVIRONMENT" \
            app.kubernetes.io/managed-by=Helm \
            --overwrite
    else
        log "Namespace $NAMESPACE already exists"
    fi
}

# Deploy via Helm
deploy_helm() {
    log "Deploying PayNext Helm chart (release: $RELEASE_NAME, ns: $NAMESPACE)..."

    helm upgrade --install "$RELEASE_NAME" "$HELM_CHART_DIR" \
        --namespace "$NAMESPACE" \
        --values "$VALUES_FILE" \
        --set global.environment="$ENVIRONMENT" \
        --wait \
        --timeout "$TIMEOUT" \
        --atomic

    log "Helm deployment completed successfully"
}

# Verify all pods are running
verify_deployment() {
    log "Verifying deployment health..."
    local retries=12
    local delay=10

    for ((i=1; i<=retries; i++)); do
        local not_ready
        not_ready=$(kubectl get pods -n "$NAMESPACE" \
            --field-selector=status.phase!=Running \
            --no-headers 2>/dev/null | grep -v "Completed" | wc -l)

        if [[ "$not_ready" -eq 0 ]]; then
            log "All pods are healthy"
            kubectl get pods -n "$NAMESPACE"
            return 0
        fi

        warn "Attempt $i/$retries: $not_ready pod(s) not ready. Waiting ${delay}s..."
        sleep "$delay"
    done

    error "Pods did not become healthy within timeout"
}

main() {
    log "Starting PayNext deployment to $ENVIRONMENT..."
    check_prerequisites
    ensure_namespace
    deploy_helm
    verify_deployment
    log "PayNext deployment to $ENVIRONMENT completed successfully"
}

main "$@"
