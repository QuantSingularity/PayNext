FROM python:3.11-slim
WORKDIR /app

COPY churn-prediction-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY churn-prediction-service/ ./churn-prediction-service/

WORKDIR /app/churn-prediction-service
EXPOSE 9003
CMD ["uvicorn", "churn_prediction_api:app", "--host", "0.0.0.0", "--port", "9003"]
