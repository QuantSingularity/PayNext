"""
Tests for DataAnalyticsService - pure unittest, no pytest required.
"""

import os
import sys
import tempfile
import unittest

import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(
    0,
    os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "..",
        "anomaly-detection-service",
    ),
)

from anomaly_data_generator import generate_synthetic_transaction_data
from data_analytics_service import DataAnalyticsService


def _make_df(n=500, users=20):
    return generate_synthetic_transaction_data(
        num_transactions=n, num_users=users, anomaly_ratio=0.0
    )


class TestDataAnalyticsServiceSegmentation(unittest.TestCase):
    def setUp(self):
        self.service = DataAnalyticsService()
        self.df = _make_df(500, 20)

    def test_train_returns_dataframe(self):
        result = self.service.train_user_segmentation_model(self.df, n_clusters=3)
        self.assertIsInstance(result, pd.DataFrame)

    def test_train_has_user_id_and_segment(self):
        result = self.service.train_user_segmentation_model(self.df, n_clusters=3)
        self.assertIn("user_id", result.columns)
        self.assertIn("segment", result.columns)

    def test_segment_count_matches_n_clusters(self):
        result = self.service.train_user_segmentation_model(self.df, n_clusters=4)
        self.assertLessEqual(result["segment"].nunique(), 4)

    def test_predict_after_train(self):
        self.service.train_user_segmentation_model(self.df, n_clusters=3)
        preds = self.service.predict_user_segment(self.df)
        self.assertIn("segment", preds.columns)
        self.assertGreater(len(preds), 0)

    def test_predict_without_train_raises(self):
        with self.assertRaises(ValueError):
            self.service.predict_user_segment(self.df)

    def test_scaler_created_after_train(self):
        self.assertIsNone(self.service.user_scaler)
        self.service.train_user_segmentation_model(self.df, n_clusters=2)
        self.assertIsNotNone(self.service.user_scaler)

    def test_kmeans_created_after_train(self):
        self.assertIsNone(self.service.kmeans_model)
        self.service.train_user_segmentation_model(self.df, n_clusters=2)
        self.assertIsNotNone(self.service.kmeans_model)


class TestDataAnalyticsServiceTrends(unittest.TestCase):
    def setUp(self):
        self.service = DataAnalyticsService()
        self.df = _make_df(1000, 50)

    def test_daily_trends_returns_dataframe(self):
        result = self.service.analyze_transaction_trends(self.df, "daily")
        self.assertIsInstance(result, pd.DataFrame)

    def test_weekly_trends_returns_dataframe(self):
        result = self.service.analyze_transaction_trends(self.df, "weekly")
        self.assertIsInstance(result, pd.DataFrame)

    def test_monthly_trends_returns_dataframe(self):
        result = self.service.analyze_transaction_trends(self.df, "monthly")
        self.assertIsInstance(result, pd.DataFrame)

    def test_invalid_granularity_raises(self):
        with self.assertRaises(ValueError):
            self.service.analyze_transaction_trends(self.df, "hourly")

    def test_daily_columns_correct(self):
        result = self.service.analyze_transaction_trends(self.df, "daily")
        self.assertIn("total_transactions", result.columns)
        self.assertIn("total_amount_spent", result.columns)
        self.assertIn("average_transaction_amount", result.columns)

    def test_total_transactions_non_negative(self):
        result = self.service.analyze_transaction_trends(self.df, "daily")
        self.assertTrue((result["total_transactions"] >= 0).all())


class TestDataAnalyticsServiceGeospatial(unittest.TestCase):
    def setUp(self):
        self.service = DataAnalyticsService()
        self.df = _make_df(500, 20)

    def test_geospatial_returns_dataframe(self):
        result = self.service.analyze_geospatial_patterns(self.df)
        self.assertIsInstance(result, pd.DataFrame)

    def test_geospatial_has_location_column(self):
        result = self.service.analyze_geospatial_patterns(self.df)
        self.assertIn("location", result.columns)

    def test_geospatial_sorted_by_amount_desc(self):
        result = self.service.analyze_geospatial_patterns(self.df)
        amounts = result["total_amount_spent"].tolist()
        self.assertEqual(amounts, sorted(amounts, reverse=True))


class TestDataAnalyticsServicePersistence(unittest.TestCase):
    def test_save_and_load(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            service = DataAnalyticsService()
            df = _make_df(300, 15)
            service.train_user_segmentation_model(df, n_clusters=3)
            path = os.path.join(tmpdir, "analytics.joblib")
            service.save_models(path)
            loaded = DataAnalyticsService.load_models(path)
            self.assertIsNotNone(loaded.kmeans_model)
            self.assertIsNotNone(loaded.user_scaler)
            self.assertEqual(loaded.segment_features, service.segment_features)

    def test_loaded_can_predict(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            service = DataAnalyticsService()
            df = _make_df(300, 15)
            service.train_user_segmentation_model(df, n_clusters=3)
            path = os.path.join(tmpdir, "analytics.joblib")
            service.save_models(path)
            loaded = DataAnalyticsService.load_models(path)
            preds = loaded.predict_user_segment(df)
            self.assertIn("segment", preds.columns)


if __name__ == "__main__":
    unittest.main()
