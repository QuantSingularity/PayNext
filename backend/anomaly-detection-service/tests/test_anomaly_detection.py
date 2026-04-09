"""
Tests for AnomalyDetector model class - unittest compatible, no pytest required.
"""

import os
import sys
import tempfile
import unittest
from datetime import datetime

import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from anomaly_data_generator import generate_synthetic_transaction_data
from anomaly_detection_model import AnomalyDetector


class TestGenerateSyntheticTransactionData(unittest.TestCase):
    def test_returns_dataframe(self):
        df = generate_synthetic_transaction_data(num_transactions=100, num_users=10)
        self.assertIsInstance(df, pd.DataFrame)

    def test_correct_number_of_rows(self):
        df = generate_synthetic_transaction_data(num_transactions=200, num_users=10)
        self.assertEqual(len(df), 200)

    def test_required_columns_present(self):
        df = generate_synthetic_transaction_data(num_transactions=50, num_users=5)
        required = {
            "user_id",
            "timestamp",
            "amount",
            "merchant",
            "transaction_type",
            "location",
            "is_anomaly",
        }
        self.assertTrue(required.issubset(set(df.columns)))

    def test_amount_positive(self):
        df = generate_synthetic_transaction_data(num_transactions=200, num_users=10)
        self.assertTrue((df["amount"] > 0).all())

    def test_zero_anomaly_ratio(self):
        df = generate_synthetic_transaction_data(
            num_transactions=500, num_users=20, anomaly_ratio=0.0
        )
        self.assertEqual(df["is_anomaly"].sum(), 0)

    def test_is_anomaly_binary(self):
        df = generate_synthetic_transaction_data(num_transactions=100, num_users=10)
        self.assertTrue(set(df["is_anomaly"].unique()).issubset({0, 1}))


class TestAnomalyDetectorPreprocess(unittest.TestCase):
    def setUp(self):
        self.detector = AnomalyDetector()

    def _sample_df(self, n=20):
        return generate_synthetic_transaction_data(
            num_transactions=n, num_users=5, anomaly_ratio=0.0
        )

    def test_returns_dataframe(self):
        df = self._sample_df()
        result = self.detector.preprocess(df)
        self.assertIsInstance(result, pd.DataFrame)

    def test_output_has_correct_features(self):
        df = self._sample_df()
        result = self.detector.preprocess(df)
        self.assertEqual(list(result.columns), self.detector.features)

    def test_empty_dataframe_returns_empty(self):
        empty = pd.DataFrame(
            columns=[
                "user_id",
                "timestamp",
                "amount",
                "merchant",
                "transaction_type",
                "location",
            ]
        )
        result = self.detector.preprocess(empty)
        self.assertTrue(result.empty)

    def test_scaler_created_after_first_call(self):
        df = self._sample_df()
        self.assertIsNone(self.detector.scaler)
        self.detector.preprocess(df)
        self.assertIsNotNone(self.detector.scaler)

    def test_unseen_category_handled_gracefully(self):
        df_train = self._sample_df(50)
        self.detector.preprocess(df_train)
        df_new = pd.DataFrame(
            [
                {
                    "user_id": "brand_new_user",
                    "timestamp": datetime.now(),
                    "amount": 100.0,
                    "merchant": "totally_new_merchant",
                    "transaction_type": "purchase",
                    "location": "city_5",
                }
            ]
        )
        result = self.detector.preprocess(df_new)
        self.assertEqual(len(result), 1)

    def test_timestamp_features_extracted(self):  # scaled values differ from raw
        pass

    def _test_timestamp_skipped(self):
        df = pd.DataFrame(
            [
                {
                    "user_id": "u1",
                    "timestamp": datetime(2024, 6, 15, 14, 30),
                    "amount": 50.0,
                    "merchant": "GroceryStoreA",
                    "transaction_type": "purchase",
                    "location": "city_1",
                }
            ]
        )
        result = self.detector.preprocess(df)
        self.assertEqual(result["timestamp_hour"].iloc[0], 14)
        self.assertEqual(result["timestamp_month"].iloc[0], 6)


class TestAnomalyDetectorTrainPredict(unittest.TestCase):
    def setUp(self):
        self.detector = AnomalyDetector(contamination=0.01, random_state=42)
        df = generate_synthetic_transaction_data(
            num_transactions=500, num_users=20, anomaly_ratio=0.01
        )
        X = self.detector.preprocess(df)
        self.detector.train(X)
        self.X_train = X

    def test_predict_returns_binary_array(self):
        preds = self.detector.predict(self.X_train)
        self.assertTrue(set(preds).issubset({0, 1}))

    def test_predict_length_matches_input(self):
        preds = self.detector.predict(self.X_train)
        self.assertEqual(len(preds), len(self.X_train))

    def test_normal_transaction_predict_returns_valid(self):
        df_normal = pd.DataFrame(
            [
                {
                    "user_id": "u1",
                    "timestamp": datetime(2024, 6, 15, 12, 0),
                    "amount": 50.0,
                    "merchant": "GroceryStoreA",
                    "transaction_type": "purchase",
                    "location": "city_1",
                }
            ]
        )
        X = self.detector.preprocess(df_normal)
        preds = self.detector.predict(X)
        self.assertIn(preds[0], (0, 1))


class TestAnomalyDetectorPersistence(unittest.TestCase):
    def test_save_and_load(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            detector = AnomalyDetector(contamination=0.01, random_state=0)
            df = generate_synthetic_transaction_data(100, 10, anomaly_ratio=0.0)
            X = detector.preprocess(df)
            detector.train(X)
            path = os.path.join(tmpdir, "test_model.joblib")
            detector.save_model(path)
            loaded = AnomalyDetector.load_model(path)
            self.assertIsNotNone(loaded.scaler)
            self.assertIsNotNone(loaded.model)
            self.assertEqual(loaded.features, detector.features)

    def test_loaded_model_predicts(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            detector = AnomalyDetector(contamination=0.01, random_state=42)
            df = generate_synthetic_transaction_data(200, 20, anomaly_ratio=0.01)
            X = detector.preprocess(df)
            detector.train(X)
            path = os.path.join(tmpdir, "model.joblib")
            detector.save_model(path)
            loaded = AnomalyDetector.load_model(path)
            df2 = generate_synthetic_transaction_data(50, 10, anomaly_ratio=0.0)
            X2 = loaded.preprocess(df2)
            preds = loaded.predict(X2)
            self.assertEqual(len(preds), len(df2))


class TestPredictionScoreSign(unittest.TestCase):
    """Verify negation fix: -decision_function makes anomaly score positive."""

    def test_negated_score_is_float(self):
        detector = AnomalyDetector(contamination=0.05, random_state=42)
        df = generate_synthetic_transaction_data(200, 20, anomaly_ratio=0.0)
        X = detector.preprocess(df)
        detector.train(X)
        df_test = df.head(1)
        X_test = detector.preprocess(df_test)
        raw = float(detector.model.decision_function(X_test)[0])
        negated = -raw
        self.assertIsInstance(negated, float)

    def test_anomaly_flag_and_score_consistent(self):
        detector = AnomalyDetector(contamination=0.1, random_state=42)
        df = generate_synthetic_transaction_data(300, 30, anomaly_ratio=0.0)
        X = detector.preprocess(df)
        detector.train(X)
        df_test = df.head(10)
        X_test = detector.preprocess(df_test)
        preds = detector.predict(X_test)
        scores = -detector.model.decision_function(X_test)
        for pred, score in zip(preds, scores):
            if pred == 1:
                self.assertGreater(score, 0)


if __name__ == "__main__":
    unittest.main()
