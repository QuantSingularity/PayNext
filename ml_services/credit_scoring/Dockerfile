FROM python:3.11-slim

WORKDIR /app

COPY common/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY common/ ./common/
COPY credit_scoring/ ./credit_scoring/

WORKDIR /app/credit_scoring

EXPOSE 8006

CMD ["uvicorn", "credit_scoring_api:app", "--host", "0.0.0.0", "--port", "8006"]
