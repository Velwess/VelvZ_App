FROM node:22-alpine3.21 AS build
RUN npm install --global pnpm
WORKDIR /opt/app

COPY package.json pnpm-lock.yam[l] package-lock.jso[n] .
RUN pnpm install

COPY . .
RUN pnpm build


FROM nginx:1.27-alpine3.21 AS production
WORKDIR /opt/app
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/app/dist /opt/app
