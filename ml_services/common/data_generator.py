import logging
from datetime import datetime, timedelta
from typing import Any

import numpy as np
import pandas as pd

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def generate_synthetic_data(num_transactions: Any = 10000) -> Any:
    np.random.seed(42)
    user_ids = [f"user_{i:04d}" for i in range(1000)]
    data = []
    start_date = datetime(2024, 1, 1)
    for i in range(num_transactions):
        user_id = np.random.choice(user_ids)
        transaction_amount = round(np.random.uniform(5, 2000), 2)
        transaction_time = start_date + timedelta(
            minutes=np.random.randint(0, 365 * 24 * 60)
        )
        location = np.random.choice(
            ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Remote"]
        )
        merchant = np.random.choice(
            [
                "Starbucks",
                "Amazon",
                "Walmart",
                "Shell",
                "Netflix",
                "Local Store",
                "Online Service",
            ]
        )
        transaction_type = np.random.choice(["purchase", "withdrawal", "transfer"])
        is_fraud = 0
        if np.random.rand() < 0.02:
            is_fraud = 1
            if np.random.rand() < 0.5:
                transaction_amount = round(np.random.uniform(2000, 10000), 2)
            else:
                location = np.random.choice(["Nigeria", "Russia", "Unknown IP"])
                transaction_time = transaction_time + timedelta(
                    hours=np.random.randint(24, 72)
                )
        data.append(
            [
                user_id,
                transaction_amount,
                transaction_time,
                location,
                merchant,
                transaction_type,
                is_fraud,
            ]
        )
    df = pd.DataFrame(
        data,
        columns=[
            "user_id",
            "transaction_amount",
            "transaction_time",
            "location",
            "merchant",
            "transaction_type",
            "is_fraud",
        ],
    )
    return df


if __name__ == "__main__":
    df = generate_synthetic_data(num_transactions=50000)
    df.to_csv("PayNext/ml_services/synthetic_transactions.csv", index=False)
    logger.info(
        "Synthetic transaction data generated and saved to PayNext/ml_services/synthetic_transactions.csv"
    )
    logger.info(df.head())
    logger.info(df["is_fraud"].value_counts())
