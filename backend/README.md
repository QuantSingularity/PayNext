# PayNext Backend

A polyglot microservices backend combining **Java Spring Boot** and **Python FastAPI / ML** services - all living as siblings in a single flat directory, deployed together via one `docker-compose.yml`.

---

## Directory Structure

```
backend/
├── ── Java Microservices (Spring Boot) ──────────────────────────────
├── eureka-server/              Service discovery (Netflix Eureka)
├── api-gateway/                JWT-secured reverse proxy + React SPA host
├── user-service/               User accounts, OTP auth, audit logs
├── payment-service/            Payment processing and ledger
├── notification-service/       Email / SMS notifications
├── common-module/              Shared JWT utilities (Java library)
│
├── ── Python ML Services (FastAPI) ──────────────────────────────────
├── fraud-detection-service/    Unified fraud detection — ML ensemble + rules
├── anomaly-detection-service/  Time-series anomaly detection
├── churn-prediction-service/   User churn prediction
├── recommendation-service/     Personalised financial recommendations
├── categorization-service/     Automatic transaction categorisation
├── credit-scoring-service/     ML-based credit score estimation
├── data-analytics-service/     Spending cluster analytics
│
├── ── Shared ────────────────────────────────────────────────────────
├── ml-common/                  Shared Python requirements + training data
├── scripts/                    MySQL init SQL
│
├── ── Orchestration ─────────────────────────────────────────────────
├── docker-compose.yml          Full unified stack
├── pom.xml                     Maven parent POM (Java)
├── train_all.py                Train all Python ML models in sequence
├── build-all.sh                Build Java (Maven) + Python (pip + train)
└── run-all.sh                  start / stop / logs
```

---

## Service Port Map

| Service                     | Port | Runtime |
| --------------------------- | ---- | ------- |
| `eureka-server`             | 8001 | Java    |
| `api-gateway`               | 8002 | Java    |
| `user-service`              | 8003 | Java    |
| `payment-service`           | 8004 | Java    |
| `notification-service`      | 8005 | Java    |
| `fraud-detection-service`   | 9001 | Python  |
| `anomaly-detection-service` | 9002 | Python  |
| `churn-prediction-service`  | 9003 | Python  |
| `recommendation-service`    | 9004 | Python  |
| `categorization-service`    | 9005 | Python  |
| `credit-scoring-service`    | 9006 | Python  |
| `data-analytics-service`    | 9007 | Python  |
| MySQL                       | 3306 | Infra   |
| Redis                       | 6379 | Infra   |
| Kafka                       | 9092 | Infra   |

---

## Quick Start

```bash
# 1. Configure secrets
cp .env.example .env   # then fill in DB password, JWT secret, mail creds

# 2. Train ML models (first run only — takes a few minutes)
pip install -r ml-common/requirements.txt
python train_all.py

# 3. Start the full stack
./run-all.sh start

# 4. Stop
./run-all.sh stop

# 5. Tail logs for one service
./run-all.sh logs fraud-detection-service
```

---
