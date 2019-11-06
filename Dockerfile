FROM node:12-alpine AS SETUP

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

FROM node:12-alpine AS BUILD

COPY --from=SETUP / /

WORKDIR /build

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ADD yarn.lock .
ADD package.json .
ADD .yarnclean .

RUN yarn

ADD . .

RUN yarn build

FROM node:12-alpine

COPY --from=SETUP / /

WORKDIR /app

COPY --from=BUILD /build/package.json .
COPY --from=BUILD /build/nest-cli.json .
COPY --from=BUILD /build/tsconfig.json .
COPY --from=BUILD /build/dist/ ./dist
COPY --from=BUILD /build/node_modules/ ./node_modules

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

ENV DOCKER true

CMD ["yarn", "start:prod"]
