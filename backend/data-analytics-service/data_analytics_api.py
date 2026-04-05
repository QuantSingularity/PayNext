import logging
import os
from contextlib import asynccontextmanager
from datetime import datetime
from typing import List

import pandas as pd
from data_analytics_service import DataAnalyticsService
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

model_path = os.path.join(os.path.dirname(__file__), "analytics_models.joblib")

analytics_service = None
GLOBAL_TRANSACTION_DATA = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global analytics_service, GLOBAL_TRANSACTION_DATA
    import sys

    sys.path.insert(
        0, os.path.join(os.path.dirname(__file__), "..", "anomaly-detection-service")
    )
    from anomaly_data_generator import generate_synthetic_transaction_data

    try:
        analytics_service = DataAnalyticsService.load_models(model_path)
        logger.info("Data Analytics Models loaded successfully.")
    except FileNotFoundError:
        logger.warning(
            f"Analytics model file not found at {model_path}. Training a new model."
        )
        synthetic_df = generate_synthetic_transaction_data(
            num_transactions=100000, num_users=500, anomaly_ratio=0.0
        )
        analytics_service = DataAnalyticsService()
        analytics_service.train_user_segmentation_model(synthetic_df, n_clusters=4)
        analytics_service.save_models(model_path)
        logger.info("New Data Analytics Models trained and saved.")
    except Exception as e:
        logger.error(f"Error loading Data Analytics Models: {e}")
        analytics_service = DataAnalyticsService()

    GLOBAL_TRANSACTION_DATA = generate_synthetic_transaction_data(
        num_transactions=200000, num_users=1000, anomaly_ratio=0.0
    )
    GLOBAL_TRANSACTION_DATA["timestamp"] = pd.to_datetime(
        GLOBAL_TRANSACTION_DATA["timestamp"]
    )
    yield


app = FastAPI(title="Data Analytics API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TransactionInput(BaseModel):
    user_id: str
    timestamp: datetime
    amount: float = Field(..., gt=0)
    merchant: str
    transaction_type: str
    location: str


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "model_loaded": analytics_service is not None
        and analytics_service.kmeans_model is not None,
    }


@app.post("/analyze/user_segmentation/")
async def get_user_segmentation(transactions: List[TransactionInput]):
    if analytics_service is None or analytics_service.kmeans_model is None:
        raise HTTPException(
            status_code=503, detail="Analytics model not loaded or trained."
        )
    try:
        df = pd.DataFrame([t.model_dump() for t in transactions])
        segments = analytics_service.predict_user_segment(df)
        return segments.to_dict(orient="records")
    except Exception as e:
        logger.error(f"Error during user segmentation: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analyze/transaction_trends/")
async def get_transaction_trends(time_granularity: str = "daily"):
    if analytics_service is None or GLOBAL_TRANSACTION_DATA is None:
        raise HTTPException(status_code=503, detail="Analytics service not ready.")
    try:
        trends = analytics_service.analyze_transaction_trends(
            GLOBAL_TRANSACTION_DATA, time_granularity
        )
        trends.index = trends.index.astype(str)
        return trends.to_dict(orient="index")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error during transaction trend analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analyze/geospatial_patterns/")
async def get_geospatial_patterns():
    if analytics_service is None or GLOBAL_TRANSACTION_DATA is None:
        raise HTTPException(status_code=503, detail="Analytics service not ready.")
    try:
        patterns = analytics_service.analyze_geospatial_patterns(
            GLOBAL_TRANSACTION_DATA
        )
        return patterns.to_dict(orient="records")
    except Exception as e:
        logger.error(f"Error during geospatial pattern analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("data_analytics_api:app", host="0.0.0.0", port=9007, reload=False)
