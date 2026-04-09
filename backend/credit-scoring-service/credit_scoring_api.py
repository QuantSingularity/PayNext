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

model_dir = os.path.dirname(__file__)

credit_scoring_model = None
credit_scoring_scaler = None
credit_scoring_features = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global credit_scoring_model, credit_scoring_scaler, credit_scoring_features
    try:
        credit_scoring_model = joblib.load(
            os.path.join(model_dir, "credit_scoring_model.joblib")
        )
        credit_scoring_scaler = joblib.load(
            os.path.join(model_dir, "credit_scoring_scaler.joblib")
        )
        credit_scoring_features = joblib.load(
            os.path.join(model_dir, "credit_scoring_features.joblib")
        )
        logger.info("Credit Scoring Model, Scaler, and Features loaded successfully.")
    except FileNotFoundError:
        logger.error(
            f"Credit scoring model, scaler, or features file not found at {model_dir}. Please train the model first."
        )
    except Exception as e:
        logger.error(f"Error loading Credit Scoring Model components: {e}")
    yield


app = FastAPI(title="Credit Scoring API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CreditScoringInput(BaseModel):
    total_transaction_amount: float = Field(..., ge=0)
    avg_transaction_amount: float = Field(..., ge=0)
    num_transactions: int = Field(..., ge=0)
    max_transaction_amount: float = Field(..., ge=0)
    min_transaction_amount: float = Field(..., ge=0)
    unique_merchants: int = Field(..., ge=0)
    avg_daily_transactions: float = Field(..., ge=0)


class CreditScoringOutput(BaseModel):
    predicted_credit_risk: str
    high_risk_probability: float


@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": credit_scoring_model is not None}


@app.post("/predict_credit_risk/", response_model=CreditScoringOutput)
async def predict_credit_risk(user_data: CreditScoringInput):
    if (
        credit_scoring_model is None
        or credit_scoring_scaler is None
        or credit_scoring_features is None
    ):
        raise HTTPException(
            status_code=503,
            detail="Credit scoring model not loaded. Please train the model.",
        )
    try:
        input_df = pd.DataFrame([user_data.model_dump()])
        input_df = input_df[credit_scoring_features]
        scaled_input = credit_scoring_scaler.transform(input_df)
        scaled_input_df = pd.DataFrame(scaled_input, columns=credit_scoring_features)
        prediction = credit_scoring_model.predict(scaled_input_df)[0]
        prediction_proba = float(
            credit_scoring_model.predict_proba(scaled_input_df)[:, 1][0]
        )
        risk_label = "High Risk" if prediction == 1 else "Low Risk"
        return CreditScoringOutput(
            predicted_credit_risk=risk_label,
            high_risk_probability=round(prediction_proba, 4),
        )
    except Exception as e:
        logger.error(f"Error during credit risk prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("credit_scoring_api:app", host="0.0.0.0", port=9006, reload=False)
