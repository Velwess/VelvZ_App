#
# base
#
FROM node:22-alpine3.21 AS base
WORKDIR /opt/app

#
# setup
#
FROM base AS setup
RUN npm install --global pnpm
COPY package.json pnpm-lock.yam[l] package-lock.jso[n] .
RUN pnpm install
COPY . .

#
# test
#
FROM setup AS test
RUN pnpm lint

#
# build
#
FROM test AS build
RUN pnpm build


FROM base AS production
ENV PORT=80
CMD ["node", "server.js"]
COPY --from=build /opt/app/.next/standalone .
COPY --from=build /opt/app/.next/static ./.next/static
