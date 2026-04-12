FROM python:3.11-slim
WORKDIR /app

COPY recommendation-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY recommendation-service/ ./recommendation-service/

WORKDIR /app/recommendation-service
EXPOSE 9004
CMD ["uvicorn", "recommendation_api:app", "--host", "0.0.0.0", "--port", "9004"]
