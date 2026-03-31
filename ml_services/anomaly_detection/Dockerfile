FROM python:3.11-slim

WORKDIR /app

COPY common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY common/ ./common/
COPY anomaly_detection/ ./anomaly_detection/

WORKDIR /app/anomaly_detection

EXPOSE 8002

CMD ["uvicorn", "anomaly_detection_api:app", "--host", "0.0.0.0", "--port", "8002"]
