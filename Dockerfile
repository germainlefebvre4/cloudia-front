FROM node:16 as build-stage
ARG ENV_NAME=dev
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn build --mode ${ENV_NAME}

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY config/nginx.conf /etc/nginx/nginx.conf
