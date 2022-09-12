FROM node:lts
ENV YARN_CACHE_FOLDER=/usr/local/yarn-cache
VOLUME /usr/local/yarn-cache

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn prisma migrate deploy && yarn start