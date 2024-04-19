FROM node:20.10-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20.10-alpine AS publish

LABEL maintainer="rodrigo marques ribeiro <rodrigomarqribeiro@gmail.com>"
LABEL version="1.0"
LABEL description="Tractian front end test"

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public/ ./public

EXPOSE 3000

CMD ["yarn", "start"]
