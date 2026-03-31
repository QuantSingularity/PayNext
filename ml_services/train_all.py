"""
Convenience script to train all ML models in the correct order.
Run this once before starting the services.
"""

import logging
import os
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

BASE = os.path.dirname(__file__)


def run(label: str, fn):
    logger.info(f"\n{'='*60}")
    logger.info(f"Training: {label}")
    logger.info(f"{'='*60}")
    try:
        fn()
        logger.info(f"[OK] {label}")
    except Exception as exc:
        logger.error(f"[FAILED] {label}: {exc}")
        raise


if __name__ == "__main__":
    sys.path.insert(0, os.path.join(BASE, "fraud"))
    sys.path.insert(0, os.path.join(BASE, "anomaly_detection"))
    sys.path.insert(0, os.path.join(BASE, "churn"))
    sys.path.insert(0, os.path.join(BASE, "recommendation"))
    sys.path.insert(0, os.path.join(BASE, "categorization"))
    sys.path.insert(0, os.path.join(BASE, "credit_scoring"))

    from anomaly_data_generator import generate_synthetic_transaction_data
    from anomaly_detection_model import AnomalyDetector
    from churn_prediction_model import train_churn_model
    from credit_scoring_model import train_credit_scoring_model
    from fraud_detection_model import train_fraud_model
    from recommendation_model import train_recommendation_model
    from transaction_categorization_model import train_categorization_model

    def train_anomaly():
        df = generate_synthetic_transaction_data(
            num_transactions=50000, num_users=200, anomaly_ratio=0.005
        )
        detector = AnomalyDetector(contamination=0.005)
        X_train = detector.preprocess(df)
        detector.train(X_train)
        model_path = os.path.join(
            BASE, "anomaly_detection", "anomaly_detector_model.joblib"
        )
        detector.save_model(model_path)
        logger.info(f"Anomaly model saved to {model_path}")

    run("Fraud Detection", train_fraud_model)
    run("Anomaly Detection", train_anomaly)
    run("Churn Prediction", train_churn_model)
    run("Recommendation", train_recommendation_model)
    run("Transaction Categorization", train_categorization_model)
    run("Credit Scoring", train_credit_scoring_model)

    logger.info("\nAll models trained successfully.")
