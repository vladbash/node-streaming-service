FROM node:12

RUN npm install -g nodemon

COPY package-lock.json /app/
COPY package.json /app/

WORKDIR /app/

RUN npm i

COPY . /app/