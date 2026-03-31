import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Any

import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

model_dir = os.path.join(os.path.dirname(__file__), "..")

fraud_model_rf = None
fraud_model_if = None
fraud_model_ae = None
fraud_scaler = None
fraud_model_features = None
location_encoder = None
merchant_encoder = None
transaction_type_encoder = None
user_id_encoder = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global fraud_model_rf, fraud_model_if, fraud_model_ae, fraud_scaler
    global fraud_model_features, location_encoder, merchant_encoder
    global transaction_type_encoder, user_id_encoder
    try:
        fraud_model_rf = joblib.load(os.path.join(model_dir, "fraud_model.joblib"))
        fraud_model_if = joblib.load(
            os.path.join(model_dir, "fraud_isolation_forest_model.joblib")
        )
        fraud_model_ae = tf.keras.models.load_model(
            os.path.join(model_dir, "fraud_autoencoder_model.keras")
        )
        fraud_scaler = joblib.load(os.path.join(model_dir, "fraud_scaler.joblib"))
        fraud_model_features = joblib.load(
            os.path.join(model_dir, "fraud_model_features.joblib")
        )
        location_encoder = joblib.load(
            os.path.join(model_dir, "location_encoder.joblib")
        )
        merchant_encoder = joblib.load(
            os.path.join(model_dir, "merchant_encoder.joblib")
        )
        transaction_type_encoder = joblib.load(
            os.path.join(model_dir, "transaction_type_encoder.joblib")
        )
        user_id_encoder = joblib.load(os.path.join(model_dir, "user_id_encoder.joblib"))
        logger.info("Fraud Detection Models and Encoders loaded successfully.")
    except FileNotFoundError as e:
        logger.error(
            f"Fraud detection model or encoder file not found: {e}. Please train the models first."
        )
    except Exception as e:
        logger.error(f"Error loading Fraud Detection Model components: {e}")
    yield


app = FastAPI(title="Fraud Detection API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class FraudPredictionInput(BaseModel):
    transaction_amount: float = Field(
        ..., gt=0, description="Transaction amount in USD"
    )
    transaction_time: datetime
    location: str
    merchant: str
    transaction_type: str
    user_id: str
    time_since_last_txn: float = Field(default=0.0, ge=0)
    user_avg_txn_amount_24h: float = Field(default=0.0, ge=0)
    user_txn_count_24h: int = Field(default=0, ge=0)
    user_avg_txn_amount_7d: float = Field(default=0.0, ge=0)
    user_txn_count_7d: int = Field(default=0, ge=0)


class FraudPredictionOutput(BaseModel):
    is_fraud: bool
    fraud_probability_rf: float
    anomaly_score_if: float
    anomaly_score_ae: float
    combined_fraud_probability: float


@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": fraud_model_rf is not None}


@app.post("/predict_fraud/", response_model=FraudPredictionOutput)
async def predict_fraud(transaction: FraudPredictionInput):
    if any(
        m is None
        for m in [
            fraud_model_rf,
            fraud_model_if,
            fraud_model_ae,
            fraud_scaler,
            fraud_model_features,
            location_encoder,
            merchant_encoder,
            transaction_type_encoder,
            user_id_encoder,
        ]
    ):
        raise HTTPException(
            status_code=503,
            detail="Fraud detection models or encoders not loaded. Please train the models.",
        )
    try:
        hour = transaction.transaction_time.hour
        day_of_week = transaction.transaction_time.weekday()
        month = transaction.transaction_time.month
        day_of_month = transaction.transaction_time.day

        def get_encoded_value(encoder: Any, value: Any) -> Any:
            try:
                return encoder.transform([value])[0]
            except ValueError:
                return -1

        location_encoded = get_encoded_value(location_encoder, transaction.location)
        merchant_encoded = get_encoded_value(merchant_encoder, transaction.merchant)
        transaction_type_encoded = get_encoded_value(
            transaction_type_encoder, transaction.transaction_type
        )
        user_id_encoded = get_encoded_value(user_id_encoder, transaction.user_id)
        input_data_dict = {
            "transaction_amount": transaction.transaction_amount,
            "hour": hour,
            "day_of_week": day_of_week,
            "month": month,
            "day_of_month": day_of_month,
            "location": location_encoded,
            "merchant": merchant_encoded,
            "transaction_type": transaction_type_encoded,
            "user_id": user_id_encoded,
            "time_since_last_txn": transaction.time_since_last_txn,
            "user_avg_txn_amount_24h": transaction.user_avg_txn_amount_24h,
            "user_txn_count_24h": transaction.user_txn_count_24h,
            "user_avg_txn_amount_7d": transaction.user_avg_txn_amount_7d,
            "user_txn_count_7d": transaction.user_txn_count_7d,
        }
        input_df = pd.DataFrame([input_data_dict])
        input_df = input_df[fraud_model_features]
        input_scaled = fraud_scaler.transform(input_df)
        input_scaled_df = pd.DataFrame(input_scaled, columns=fraud_model_features)
        prediction_proba_rf = float(
            fraud_model_rf.predict_proba(input_scaled_df)[:, 1][0]
        )
        anomaly_score_if = float(-fraud_model_if.decision_function(input_scaled_df)[0])
        reconstruction = fraud_model_ae.predict(input_scaled_df, verbose=0)
        mse = float(
            np.mean(np.power(input_scaled_df.values - reconstruction, 2), axis=1)[0]
        )
        normalized_anomaly_score_if = 1 / (1 + np.exp(-anomaly_score_if))
        normalized_anomaly_score_ae = 1 / (1 + np.exp(-mse))
        combined_fraud_probability = (
            prediction_proba_rf * 0.5
            + normalized_anomaly_score_if * 0.25
            + normalized_anomaly_score_ae * 0.25
        )
        is_fraud = bool(combined_fraud_probability > 0.5)
        return FraudPredictionOutput(
            is_fraud=is_fraud,
            fraud_probability_rf=round(prediction_proba_rf, 4),
            anomaly_score_if=round(anomaly_score_if, 4),
            anomaly_score_ae=round(mse, 4),
            combined_fraud_probability=round(float(combined_fraud_probability), 4),
        )
    except Exception as e:
        logger.error(f"Error during fraud prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("fraud_detection_api:app", host="0.0.0.0", port=8001, reload=False)
