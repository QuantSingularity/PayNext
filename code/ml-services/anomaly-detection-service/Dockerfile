FROM python:3.11-slim
WORKDIR /app

# Install dependencies (lightweight - no TF)
COPY anomaly-detection-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy shared data generator (needed at runtime for on-the-fly training)
COPY ml-common/ ./ml-common/
# Copy service source
COPY anomaly-detection-service/ ./anomaly-detection-service/

WORKDIR /app/anomaly-detection-service
EXPOSE 9002
CMD ["uvicorn", "anomaly_detection_api:app", "--host", "0.0.0.0", "--port", "9002"]
