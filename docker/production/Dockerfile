FROM node:lts AS runtime
WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

ENV HOST=0.0.0.0
ENV PORT 4000

EXPOSE 4000

CMD node ./dist/server/entry.mjs