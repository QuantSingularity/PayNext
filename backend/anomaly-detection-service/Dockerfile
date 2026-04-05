FROM python:3.11-slim

WORKDIR /app

COPY ml-common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY anomaly-detection-service/ ./anomaly-detection-service/

WORKDIR /app/anomaly-detection-service

EXPOSE 9002

CMD ["uvicorn", "anomaly_detection_api:app", "--host", "0.0.0.0", "--port", "9002"]
