FROM --platform=$BUILDPLATFORM python:3.10-alpine

WORKDIR /app

COPY requirements.txt /app

RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev && pip3 install -r requirements.txt

COPY . /app

EXPOSE 5000
ENV FLASK_APP=server.py

ENTRYPOINT ["flask", "run", "--host", "0.0.0.0"]
