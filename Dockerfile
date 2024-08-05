FROM node:22 AS builder
WORKDIR /app
COPY . /app

RUN ["yarn", "install"]
RUN ["yarn", "build"]

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80