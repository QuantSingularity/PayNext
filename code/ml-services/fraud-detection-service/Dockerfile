FROM python:3.11-slim
WORKDIR /app

COPY fraud-detection-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY fraud-detection-service/ ./fraud-detection-service/

WORKDIR /app/fraud-detection-service
RUN mkdir -p models

EXPOSE 9001
CMD ["uvicorn", "fraud_detection_api:app", "--host", "0.0.0.0", "--port", "9001"]
