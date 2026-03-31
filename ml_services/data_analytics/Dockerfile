FROM python:3.11-slim

WORKDIR /app

COPY common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY common/ ./common/
COPY anomaly_detection/ ./anomaly_detection/
COPY data_analytics/ ./data_analytics/

WORKDIR /app/data_analytics

EXPOSE 8007

CMD ["uvicorn", "data_analytics_api:app", "--host", "0.0.0.0", "--port", "8007"]
