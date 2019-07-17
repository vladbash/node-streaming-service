FROM node:10

RUN apt-get update && apt-get install libshout-dev -y

RUN npm i -g nodemon

COPY package-lock.json /app/
COPY package.json /app/

WORKDIR /app/

RUN rm -rf /node_modules/bcrypt
RUN npm i

COPY . /app/

RUN dpkg -i libshout3_2.4.1-2build1_amd64.deb
RUN apt-get install -f -y