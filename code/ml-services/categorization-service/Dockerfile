FROM python:3.11-slim
WORKDIR /app

COPY categorization-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY categorization-service/ ./categorization-service/

WORKDIR /app/categorization-service
EXPOSE 9005
CMD ["uvicorn", "categorization_api:app", "--host", "0.0.0.0", "--port", "9005"]
