FROM python:3.11.3-bullseye

WORKDIR /back
COPY ./requirements.txt /back/requirements.txt
RUN pip install -r requirements.txt
COPY . /back/
EXPOSE 8000
