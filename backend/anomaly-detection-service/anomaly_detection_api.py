import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime

import pandas as pd
from anomaly_detection_model import AnomalyDetector
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

model_path = os.path.join(os.path.dirname(__file__), "anomaly_detector_model.joblib")

anomaly_detector = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global anomaly_detector
    try:
        anomaly_detector = AnomalyDetector.load_model(model_path)
        logger.info("Anomaly Detection Model loaded successfully.")
    except FileNotFoundError:
        logger.warning(
            f"Model file not found at {model_path}. Training a new model for demonstration."
        )
        from anomaly_data_generator import generate_synthetic_transaction_data

        synthetic_df = generate_synthetic_transaction_data(
            num_transactions=10000, num_users=100, anomaly_ratio=0.01
        )
        anomaly_detector = AnomalyDetector(contamination=0.01)
        X_train = anomaly_detector.preprocess(synthetic_df)
        anomaly_detector.train(X_train)
        anomaly_detector.save_model(model_path)
        logger.info("New Anomaly Detection Model trained and saved.")
    except Exception as e:
        logger.error(f"Error loading Anomaly Detection Model: {e}")
        anomaly_detector = AnomalyDetector()
    yield


app = FastAPI(title="Anomaly Detection API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Transaction(BaseModel):
    user_id: str
    timestamp: datetime
    amount: float = Field(..., gt=0)
    merchant: str
    transaction_type: str
    location: str


class AnomalyPredictionOutput(BaseModel):
    is_anomaly: bool
    prediction_score: float


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "model_loaded": anomaly_detector is not None
        and anomaly_detector.scaler is not None,
    }


@app.post("/predict_anomaly/", response_model=AnomalyPredictionOutput)
async def predict_anomaly(transaction: Transaction):
    if anomaly_detector is None or anomaly_detector.scaler is None:
        raise HTTPException(
            status_code=503,
            detail="Anomaly detection model is not trained. Please train the model first.",
        )
    try:
        transaction_df = pd.DataFrame([transaction.model_dump()])
        processed_transaction = anomaly_detector.preprocess(transaction_df)
        prediction = anomaly_detector.predict(processed_transaction)[0]
        score = float(
            anomaly_detector.model.decision_function(processed_transaction)[0]
        )
        return AnomalyPredictionOutput(
            is_anomaly=bool(prediction), prediction_score=score
        )
    except Exception as e:
        logger.error(f"Error during anomaly prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("anomaly_detection_api:app", host="0.0.0.0", port=9002, reload=False)
