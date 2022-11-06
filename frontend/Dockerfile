FROM node:16-alpine

WORKDIR /app/frontend/

COPY package.json /app/frontend/

RUN yarn

COPY . /app/frontend

ENTRYPOINT ./runfrontend