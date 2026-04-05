FROM python:3.11-slim

WORKDIR /app

COPY ml-common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY anomaly-detection-service/ ./anomaly-detection-service/
COPY data-analytics-service/ ./data-analytics-service/

WORKDIR /app/data-analytics-service

EXPOSE 9007

CMD ["uvicorn", "data_analytics_api:app", "--host", "0.0.0.0", "--port", "9007"]
