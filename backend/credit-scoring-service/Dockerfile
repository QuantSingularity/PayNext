FROM python:3.11-slim

WORKDIR /app

COPY ml-common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY ml-common/ ./ml-common/
COPY credit-scoring-service/ ./credit-scoring-service/

WORKDIR /app/credit-scoring-service

EXPOSE 9006

CMD ["uvicorn", "credit_scoring_api:app", "--host", "0.0.0.0", "--port", "9006"]
