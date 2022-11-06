FROM python:3.10

WORKDIR /app
COPY requirements.txt /app

RUN pip3 install --no-cache-dir -r requirements.txt

ENTRYPOINT ./runner/runner.sh