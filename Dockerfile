FROM node:16-alpine

RUN apk update

EXPOSE 3000

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app