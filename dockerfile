FROM node:16-slim as base

RUN apt-get update
RUN apt-get install -y openssl

FROM base as dev

WORKDIR /app

COPY package.json .
# COPY tsconfig.json .

COPY . .

RUN npm install

RUN npm run build


EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]