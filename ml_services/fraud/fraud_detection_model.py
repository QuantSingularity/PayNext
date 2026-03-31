import logging
import os
from typing import Any

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.layers import Dense, Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def train_fraud_model(
    data_path: Any = os.path.join(
        os.path.dirname(__file__), "..", "common", "synthetic_transactions.csv"
    )
) -> Any:
    df = pd.read_csv(data_path)
    df["transaction_time"] = pd.to_datetime(df["transaction_time"])
    df = df.sort_values(by=["user_id", "transaction_time"])
    df["hour"] = df["transaction_time"].dt.hour
    df["day_of_week"] = df["transaction_time"].dt.dayofweek
    df["month"] = df["transaction_time"].dt.month
    df["day_of_month"] = df["transaction_time"].dt.day
    df["time_since_last_txn"] = (
        df.groupby("user_id")["transaction_time"].diff().dt.total_seconds().fillna(0)
    )
    df["user_avg_txn_amount_24h"] = (
        df.groupby("user_id")["transaction_amount"]
        .rolling("24h", on="transaction_time")
        .mean()
        .reset_index(level=0, drop=True)
    )
    df["user_txn_count_24h"] = (
        df.groupby("user_id")["transaction_amount"]
        .rolling("24h", on="transaction_time")
        .count()
        .reset_index(level=0, drop=True)
    )
    df["user_avg_txn_amount_7d"] = (
        df.groupby("user_id")["transaction_amount"]
        .rolling("7D", on="transaction_time")
        .mean()
        .reset_index(level=0, drop=True)
    )
    df["user_txn_count_7d"] = (
        df.groupby("user_id")["transaction_amount"]
        .rolling("7D", on="transaction_time")
        .count()
        .reset_index(level=0, drop=True)
    )
    df.fillna(0, inplace=True)
    categorical_cols = ["location", "merchant", "transaction_type", "user_id"]
    model_dir = os.path.join(os.path.dirname(__file__), "..")
    for col in categorical_cols:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(np.array(df[col]))
            joblib.dump(le, os.path.join(model_dir, f"{col}_encoder.joblib"))
    features = [
        "transaction_amount",
        "hour",
        "day_of_week",
        "month",
        "day_of_month",
        "location",
        "merchant",
        "transaction_type",
        "user_id",
        "time_since_last_txn",
        "user_avg_txn_amount_24h",
        "user_txn_count_24h",
        "user_avg_txn_amount_7d",
        "user_txn_count_7d",
    ]
    X = df[features]
    y = df["is_fraud"]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    joblib.dump(scaler, os.path.join(model_dir, "fraud_scaler.joblib"))
    X = pd.DataFrame(X_scaled, columns=features)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )
    model_rf = RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        class_weight="balanced",
        max_depth=10,
        min_samples_leaf=5,
    )
    model_rf.fit(X_train, y_train)
    y_pred_rf = model_rf.predict(X_test)
    y_proba_rf = model_rf.predict_proba(X_test)[:, 1]
    logger.info("\nRandomForest Fraud Detection Model Report:")
    logger.info(classification_report(y_test, y_pred_rf))
    logger.info(f"Confusion Matrix:\n{confusion_matrix(y_test, y_pred_rf)}")
    logger.info(f"ROC AUC Score: {roc_auc_score(y_test, y_proba_rf):.4f}")
    model_if = IsolationForest(
        random_state=42, contamination=float(y_train.sum()) / len(y_train)
    )
    model_if.fit(X_train)
    y_pred_if = model_if.predict(X_test)
    y_pred_if_binary = np.where(y_pred_if == -1, 1, 0)
    logger.info("\nIsolation Forest Anomaly Detection Report:")
    logger.info(classification_report(y_test, y_pred_if_binary))
    logger.info(f"Confusion Matrix:\n{confusion_matrix(y_test, y_pred_if_binary)}")
    y_proba_if = -model_if.decision_function(X_test)
    logger.info(f"ROC AUC Score: {roc_auc_score(y_test, y_proba_if):.4f}")
    joblib.dump(model_rf, os.path.join(model_dir, "fraud_model.joblib"))
    joblib.dump(
        model_if, os.path.join(model_dir, "fraud_isolation_forest_model.joblib")
    )
    joblib.dump(features, os.path.join(model_dir, "fraud_model_features.joblib"))
    logger.info("Fraud detection RandomForest and Isolation Forest models saved.")
    input_dim = X_train.shape[1]
    encoding_dim = max(1, int(input_dim / 2))
    input_layer = Input(shape=(input_dim,))
    encoded = Dense(encoding_dim, activation="relu")(input_layer)
    decoded = Dense(input_dim, activation="sigmoid")(encoded)
    autoencoder = Model(inputs=input_layer, outputs=decoded)
    autoencoder.compile(optimizer=Adam(learning_rate=0.001), loss="mean_squared_error")
    logger.info("\nTraining Autoencoder for Anomaly Detection...")
    autoencoder.fit(
        X_train,
        X_train,
        epochs=50,
        batch_size=32,
        shuffle=True,
        validation_split=0.1,
        verbose=0,
    )
    logger.info("Autoencoder training complete.")
    ae_save_path = os.path.join(model_dir, "fraud_autoencoder_model.keras")
    autoencoder.save(ae_save_path)
    logger.info(f"Fraud detection Autoencoder model saved to {ae_save_path}")


if __name__ == "__main__":
    train_fraud_model()
