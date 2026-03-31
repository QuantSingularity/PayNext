FROM python:3.11-slim

WORKDIR /app

COPY common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY common/ ./common/
COPY churn/ ./churn/

WORKDIR /app/churn

EXPOSE 8003

CMD ["uvicorn", "churn_prediction_api:app", "--host", "0.0.0.0", "--port", "8003"]
