import logging
import os
from contextlib import asynccontextmanager

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

model_dir = os.path.join(os.path.dirname(__file__), "..")

churn_model = None
churn_scaler = None
churn_model_features = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global churn_model, churn_scaler, churn_model_features
    try:
        churn_model = joblib.load(os.path.join(model_dir, "churn_model.joblib"))
        churn_scaler = joblib.load(os.path.join(model_dir, "churn_scaler.joblib"))
        churn_model_features = joblib.load(
            os.path.join(model_dir, "churn_model_features.joblib")
        )
        logger.info("Churn Prediction Model, Scaler, and Features loaded successfully.")
    except FileNotFoundError:
        logger.error(
            f"Churn model, scaler, or features file not found at {model_dir}. Please train the model first."
        )
    except Exception as e:
        logger.error(f"Error loading Churn Prediction Model components: {e}")
    yield


app = FastAPI(title="Churn Prediction API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChurnPredictionInput(BaseModel):
    avg_transactions_per_month: float = Field(..., ge=0)
    avg_logins_per_month: float = Field(..., ge=0)
    avg_feature_usage_score: float = Field(..., ge=0, le=1)
    total_months_active: int = Field(..., ge=0)
    tenure_months: float = Field(default=0.0, ge=0)
    avg_transactions_diff: float = 0.0
    avg_logins_diff: float = 0.0
    avg_feature_usage_diff: float = 0.0
    max_transactions_per_month: float = Field(default=0.0, ge=0)
    min_transactions_per_month: float = Field(default=0.0, ge=0)
    avg_rolling_avg_transactions_3m: float = Field(default=0.0, ge=0)
    avg_rolling_std_transactions_3m: float = Field(default=0.0, ge=0)
    avg_rolling_avg_logins_3m: float = Field(default=0.0, ge=0)
    avg_rolling_std_logins_3m: float = Field(default=0.0, ge=0)


class ChurnPredictionOutput(BaseModel):
    is_churn_risk: bool
    churn_probability: float


@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": churn_model is not None}


@app.post("/predict_churn/", response_model=ChurnPredictionOutput)
async def predict_churn(user_data: ChurnPredictionInput):
    if churn_model is None or churn_scaler is None or churn_model_features is None:
        raise HTTPException(
            status_code=503,
            detail="Churn prediction model not loaded. Please train the model.",
        )
    try:
        input_df = pd.DataFrame([user_data.model_dump()])
        input_df = input_df[churn_model_features]
        input_scaled = churn_scaler.transform(input_df)
        prediction_proba = float(churn_model.predict_proba(input_scaled)[:, 1][0])
        is_churn = bool(churn_model.predict(input_scaled)[0])
        return ChurnPredictionOutput(
            is_churn_risk=is_churn,
            churn_probability=round(prediction_proba, 4),
        )
    except Exception as e:
        logger.error(f"Error during churn prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("churn_prediction_api:app", host="0.0.0.0", port=8003, reload=False)
