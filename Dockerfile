FROM node:22 AS builder
WORKDIR /app
COPY . /app

RUN ["yarn", "install"]

CMD ["yarn", "start"]