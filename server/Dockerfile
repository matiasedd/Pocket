FROM node:alpine

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "./"]
COPY . .

RUN yarn

EXPOSE 3000

CMD yarn cache clean && yarn install