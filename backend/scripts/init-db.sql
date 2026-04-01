CREATE DATABASE IF NOT EXISTS user_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS payment_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS fraud_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS notification_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON user_db.* TO 'paynext'@'%';
GRANT ALL PRIVILEGES ON payment_db.* TO 'paynext'@'%';
GRANT ALL PRIVILEGES ON fraud_db.* TO 'paynext'@'%';
GRANT ALL PRIVILEGES ON notification_db.* TO 'paynext'@'%';
FLUSH PRIVILEGES;
