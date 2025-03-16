FROM node:22-alpine3.21 AS build
WORKDIR /opt/app

COPY package.json package-lock.jso[n] .
RUN npm ci

COPY . .
RUN npm run build


FROM nginx:1.27-alpine3.21 AS production
WORKDIR /opt/app
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/app/dist /opt/app
