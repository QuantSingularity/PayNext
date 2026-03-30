from datetime import datetime
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import LabelEncoder, StandardScaler
from core.logging import get_logger

logger = get_logger(__name__)


class AnomalyDetector:

    def __init__(self, contamination: Any = 0.01, random_state: Any = 42) -> None:
        self.model = IsolationForest(
            contamination=contamination, random_state=random_state
        )
        self.label_encoders = {}
        self.scaler = None
        self.features = [
            "amount",
            "timestamp_hour",
            "timestamp_day_of_week",
            "timestamp_month",
            "user_id_encoded",
            "merchant_encoded",
            "transaction_type_encoded",
            "location_encoded",
        ]

    def preprocess(self, df: Any) -> Any:
        if df.empty:
            return pd.DataFrame(columns=self.features)
        df_processed = df.copy()
        df_processed["timestamp"] = pd.to_datetime(df_processed["timestamp"])
        df_processed["timestamp_hour"] = df_processed["timestamp"].dt.hour
        df_processed["timestamp_day_of_week"] = df_processed["timestamp"].dt.dayofweek
        df_processed["timestamp_month"] = df_processed["timestamp"].dt.month
        categorical_cols = ["user_id", "merchant", "transaction_type", "location"]
        for col in categorical_cols:
            if col in df_processed.columns:
                if col not in self.label_encoders:
                    self.label_encoders[col] = LabelEncoder()
                    df_processed[f"{col}_encoded"] = self.label_encoders[
                        col
                    ].fit_transform(df_processed[col])
                else:
                    known_labels = list(self.label_encoders[col].classes_)
                    max_encoded_value = len(known_labels)
                    df_processed[f"{col}_encoded"] = df_processed[col].apply(
                        lambda x: (
                            self.label_encoders[col].transform([x])[0]
                            if x in known_labels
                            else max_encoded_value
                        )
                    )
            else:
                df_processed[f"{col}_encoded"] = 0
        numerical_cols = [
            "amount",
            "timestamp_hour",
            "timestamp_day_of_week",
            "timestamp_month",
        ]
        if self.scaler is None:
            self.scaler = StandardScaler()
            df_processed[numerical_cols] = self.scaler.fit_transform(
                df_processed[numerical_cols]
            )
        else:
            df_processed[numerical_cols] = self.scaler.transform(
                df_processed[numerical_cols]
            )
        return df_processed[self.features]

    def train(self, X_train: Any) -> Any:
        self.model.fit(X_train)

    def predict(self, X_test: Any) -> Any:
        predictions = self.model.predict(X_test)
        return np.where(predictions == -1, 1, 0)

    def save_model(self, path: Any) -> Any:
        joblib.dump(
            {
                "model": self.model,
                "label_encoders": self.label_encoders,
                "scaler": self.scaler,
                "features": self.features,
            },
            path,
        )

    @classmethod
    def load_model(cls: Any, path: Any) -> Any:
        data = joblib.load(path)
        detector = cls()
        detector.model = data["model"]
        detector.label_encoders = data["label_encoders"]
        detector.scaler = data["scaler"]
        detector.features = data["features"]
        return detector


if __name__ == "__main__":
    from anomaly_data_generator import generate_synthetic_transaction_data

    logger.info("Generating synthetic data...")
    synthetic_df = generate_synthetic_transaction_data(
        num_transactions=50000, num_users=200, anomaly_ratio=0.005
    )
    logger.info("Synthetic data generated.")
    detector = AnomalyDetector(contamination=0.005)
    X_train = detector.preprocess(synthetic_df)
    logger.info("Training Anomaly Detection model...")
    detector.train(X_train)
    logger.info("Model trained.")
    model_path = "anomaly_detector_model.joblib"
    detector.save_model(model_path)
    logger.info(f"Model saved to {model_path}")
    loaded_detector = AnomalyDetector.load_model(model_path)
    logger.info("Model loaded.")
    X_test = loaded_detector.preprocess(synthetic_df)
    predictions = loaded_detector.predict(X_test)
    logger.info("Predictions made.")
    logger.info(f"Total transactions: {len(predictions)}")
    logger.info(f"Detected anomalies: {np.sum(predictions)}")
    true_anomalies = synthetic_df["is_anomaly"].sum()
    detected_anomalies_correctly = np.sum(predictions[synthetic_df["is_anomaly"] == 1])
    logger.info(f"True anomalies in data: {true_anomalies}")
    logger.info(
        f"Anomalies detected that were true anomalies: {detected_anomalies_correctly}"
    )
    logger.info(
        f"False positives (normal transactions predicted as anomaly): {np.sum(predictions[synthetic_df['is_anomaly'] == 0])}"
    )
    logger.info("\nPredicting a single transaction:")
    sample_normal_transaction = pd.DataFrame(
        [
            {
                "user_id": "user_001",
                "timestamp": datetime.now(),
                "amount": 50.0,
                "merchant": "GroceryStoreA",
                "transaction_type": "purchase",
                "location": "city_1",
                "is_anomaly": 0,
            }
        ]
    )
    sample_anomaly_transaction = pd.DataFrame(
        [
            {
                "user_id": "user_002",
                "timestamp": datetime.now().replace(hour=3),
                "amount": 5000.0,
                "merchant": "DarkWebVendor",
                "transaction_type": "transfer",
                "location": "city_9",
                "is_anomaly": 1,
            }
        ]
    )
    processed_normal = loaded_detector.preprocess(sample_normal_transaction)
    processed_anomaly = loaded_detector.preprocess(sample_anomaly_transaction)
    normal_pred = loaded_detector.predict(processed_normal)
    anomaly_pred = loaded_detector.predict(processed_anomaly)
    logger.info(
        f"Normal transaction prediction: {normal_pred[0]} (0=Normal, 1=Anomaly)"
    )
    logger.info(
        f"Anomaly transaction prediction: {anomaly_pred[0]} (0=Normal, 1=Anomaly)"
    )
