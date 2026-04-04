-- PayNext Database Initialization
-- Creates per-service databases on a single PostgreSQL instance (for local dev)

CREATE DATABASE user_service_db;
CREATE DATABASE payment_service_db;
CREATE DATABASE notification_service_db;

GRANT ALL PRIVILEGES ON DATABASE user_service_db TO paynext;
GRANT ALL PRIVILEGES ON DATABASE payment_service_db TO paynext;
GRANT ALL PRIVILEGES ON DATABASE notification_service_db TO paynext;
