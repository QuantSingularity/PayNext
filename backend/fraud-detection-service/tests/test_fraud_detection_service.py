"""Tests for fraud_detection_service.py - pure unittest, all deps mocked."""

import enum
import os
import sys
import types
import unittest
from datetime import datetime
from unittest.mock import MagicMock

# Stub heavy dependencies
sys.modules.setdefault("joblib", MagicMock())
tf_m = MagicMock()
sys.modules.setdefault("tensorflow", tf_m)
sys.modules.setdefault("tensorflow.keras", tf_m.keras)
sys.modules.setdefault("kafka", MagicMock())
sys.modules.setdefault("redis", MagicMock())
sa_m = MagicMock()
sys.modules.setdefault("sqlalchemy", sa_m)
sys.modules.setdefault("sqlalchemy.orm", sa_m.orm)

cache_mock = MagicMock()
cache_mock.user_profile_key.side_effect = lambda uid: f"fraud:profile:{uid}"
cache_mock.get.return_value = None
sys.modules["cache"] = cache_mock
sys.modules["kafka_producer"] = MagicMock()

models_mod = types.ModuleType("models")


class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class FraudStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    DECLINED = "DECLINED"
    UNDER_REVIEW = "UNDER_REVIEW"
    FALSE_POSITIVE = "FALSE_POSITIVE"


class TransactionAnalysis:
    # Class-level attributes needed for SQLAlchemy-style filter expressions in tests
    created_at = MagicMock()
    fraud_status = MagicMock()
    risk_level = MagicMock()

    def __init__(self, **kw):
        [setattr(self, k, v) for k, v in kw.items()]
        self.id = 1


class UserBehaviorProfile:
    pass


for cls in [RiskLevel, FraudStatus, TransactionAnalysis, UserBehaviorProfile]:
    setattr(models_mod, cls.__name__, cls)
sys.modules["models"] = models_mod

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import fraud_detection_service as svc


def _req(**extra):
    base = {
        "transaction_id": "txn-001",
        "user_id": "user_001",
        "transaction_amount": 100.0,
        "transaction_time": datetime(2024, 6, 15, 14, 30),
        "currency": "USD",
        "transaction_type": "purchase",
        "payment_method": "card",
    }
    base.update(extra)
    return base


def _mock_db(profile=None):
    db = MagicMock()
    q = MagicMock()
    db.query.return_value = q
    q.filter.return_value = q
    q.filter_by.return_value = q
    q.first.return_value = profile
    q.count.return_value = 0
    return db


class TestWeightConstants(unittest.TestCase):
    def test_weights_sum_to_one(self):
        total = (
            svc._VELOCITY_W
            + svc._BEHAVIORAL_W
            + svc._GEO_W
            + svc._DEVICE_W
            + svc._AMOUNT_W
            + svc._TIME_W
            + svc._ML_W
        )
        self.assertAlmostEqual(total, 1.0, places=9)

    def test_ml_weight_positive(self):
        self.assertGreater(svc._ML_W, 0)

    def test_threshold_ordering(self):
        self.assertLess(svc._THRESHOLD_HIGH, svc._THRESHOLD_CRITICAL)


class TestDetermineRiskLevel(unittest.TestCase):
    def test_low(self):
        self.assertEqual(svc._determine_risk_level(0.1), RiskLevel.LOW)

    def test_medium(self):
        self.assertEqual(svc._determine_risk_level(0.3), RiskLevel.MEDIUM)

    def test_high(self):
        self.assertEqual(svc._determine_risk_level(svc._THRESHOLD_HIGH), RiskLevel.HIGH)

    def test_critical(self):
        self.assertEqual(
            svc._determine_risk_level(svc._THRESHOLD_CRITICAL), RiskLevel.CRITICAL
        )

    def test_max(self):
        self.assertEqual(svc._determine_risk_level(0.99), RiskLevel.CRITICAL)


class TestTimeOfDayScore(unittest.TestCase):
    def test_daytime_zero(self):
        self.assertEqual(
            svc._time_of_day_score(_req(transaction_time=datetime(2024, 1, 1, 12, 0))),
            0.0,
        )

    def test_midnight_flagged(self):
        self.assertGreater(
            svc._time_of_day_score(_req(transaction_time=datetime(2024, 1, 1, 0, 0))),
            0.0,
        )

    def test_3am_flagged(self):
        self.assertGreater(
            svc._time_of_day_score(_req(transaction_time=datetime(2024, 1, 1, 3, 0))),
            0.0,
        )

    def test_11pm_flagged(self):
        self.assertGreater(
            svc._time_of_day_score(_req(transaction_time=datetime(2024, 1, 1, 23, 15))),
            0.0,
        )

    def test_6am_not_flagged(self):
        self.assertEqual(
            svc._time_of_day_score(_req(transaction_time=datetime(2024, 1, 1, 6, 0))),
            0.0,
        )

    def test_string_time(self):
        self.assertGreater(
            svc._time_of_day_score(_req(transaction_time="2024-01-01T02:00:00")), 0.0
        )

    def test_no_time_zero(self):
        self.assertEqual(svc._time_of_day_score({}), 0.0)


class TestAmountScore(unittest.TestCase):
    def test_normal_no_profile(self):
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=50.0), _mock_db(None)), 0.0
        )

    def test_very_high_no_profile(self):
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=15000.0), _mock_db(None)),
            0.8,
        )

    def test_high_no_profile(self):
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=7000.0), _mock_db(None)),
            0.5,
        )

    def test_medium_no_profile(self):
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=1500.0), _mock_db(None)),
            0.2,
        )

    def test_exceeds_double_max(self):
        profile = MagicMock()
        profile.max_transaction_amount = 100.0
        profile.avg_transaction_amount = 50.0
        cache_mock.get.return_value = None
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=250.0), _mock_db(profile)),
            0.8,
        )

    def test_within_normal_range(self):
        profile = MagicMock()
        profile.max_transaction_amount = 500.0
        profile.avg_transaction_amount = 100.0
        cache_mock.get.return_value = None
        self.assertEqual(
            svc._amount_score("u1", _req(transaction_amount=80.0), _mock_db(profile)),
            0.0,
        )


class TestGenerateIndicators(unittest.TestCase):
    def _scores(self, **overrides):
        base = {
            k: 0.0
            for k in [
                "velocity",
                "behavioral",
                "geolocation",
                "device",
                "amount",
                "time_of_day",
                "ml_combined",
            ]
        }
        base.update(overrides)
        return base

    def test_no_indicators_for_low_scores(self):
        self.assertEqual(len(svc._generate_indicators(_req(), self._scores())), 0)

    def test_velocity_indicator(self):
        self.assertIn(
            "HIGH_VELOCITY",
            svc._generate_indicators(_req(), self._scores(velocity=0.8)),
        )

    def test_time_risk_indicator(self):
        self.assertIn(
            "TIME_RISK", svc._generate_indicators(_req(), self._scores(time_of_day=0.3))
        )

    def test_all_indicators(self):
        self.assertEqual(
            len(
                svc._generate_indicators(
                    _req(),
                    self._scores(
                        **{
                            k: 0.9
                            for k in [
                                "velocity",
                                "behavioral",
                                "geolocation",
                                "device",
                                "amount",
                                "time_of_day",
                                "ml_combined",
                            ]
                        }
                    ),
                )
            ),
            7,
        )


class TestGeolocationScore(unittest.TestCase):
    def test_high_risk_country(self):
        cache_mock.get.return_value = None
        self.assertGreaterEqual(
            svc._geolocation_score("u1", _req(location_country="XX"), _mock_db(None)),
            0.4,
        )

    def test_normal_country(self):
        cache_mock.get.return_value = None
        self.assertEqual(
            svc._geolocation_score("u1", _req(location_country="US"), _mock_db(None)),
            0.0,
        )


class TestComputeMlScoreNotLoaded(unittest.TestCase):
    def test_returns_zeros(self):
        svc._models_loaded = False
        self.assertEqual(
            svc._compute_ml_score(_req()),
            {"rf": 0.0, "if": 0.0, "ae": 0.0, "combined": 0.0},
        )


class TestMarkTransactionFraud(unittest.TestCase):
    def _db(self, ret):
        db = MagicMock()
        q = MagicMock()
        db.query.return_value = q
        q.filter_by.return_value = q
        q.first.return_value = ret
        return db

    def test_not_found_returns_none(self):
        self.assertIsNone(
            svc.mark_transaction_fraud("x", True, "a", None, self._db(None))
        )

    def test_marks_fraud(self):
        a = MagicMock()
        svc.mark_transaction_fraud("t", True, "analyst", "notes", self._db(a))
        self.assertEqual(a.fraud_status, FraudStatus.DECLINED)
        self.assertEqual(a.reviewed_by, "analyst")

    def test_marks_false_positive(self):
        a = MagicMock()
        svc.mark_transaction_fraud("t", False, "analyst", None, self._db(a))
        self.assertEqual(a.fraud_status, FraudStatus.FALSE_POSITIVE)


if __name__ == "__main__":
    unittest.main()
