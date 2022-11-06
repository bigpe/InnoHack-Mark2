FROM python:3.10

WORKDIR /app
COPY requirements.txt /app

RUN sudo apt-get install -y --no-install-recommends libnvinfer7=7.0.1-1+cuda10.1 \
    libnvinfer-dev=7.0.1-1+cuda10.1 \
    libnvinfer-plugin6=7.0.1-1+cuda10.1
RUN pip3 install --no-cache-dir -r requirements.txt

ENTRYPOINT ./runner/runner.sh