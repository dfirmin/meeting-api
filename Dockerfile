FROM node:12.16.1-alpine

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY ./ /api/

CMD ["npm", "run", "dev"]