FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
