FROM python:3.8-slim-buster

WORKDIR /app/backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install flask-jwt-extended

COPY . .

EXPOSE 5001

CMD [ "python3", "app.py"]