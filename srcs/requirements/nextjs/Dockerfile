# syntax=docker/dockerfile:1
# escape=\

FROM node@sha256:bec402741e59b7f74ddf1b78bff2013c178bebd3b5cf841c202d376d5f1d738a

#Installing utils
RUN apk update \
	&& apk upgrade \
	&& apk add vim

RUN npx create-next-app@15.0.3 transcendence --typescript --eslint --no-tailwind \
		--src-dir --app --no-import-alias --no-turbopack --use-yarn

WORKDIR /transcendence

RUN yarn add axios
RUN yarn install

COPY ./tools/public/ ./public
COPY ./tools/app/ ./src/app/
COPY ./tools/.eslintrc.json ./.eslintrc.json
#COPY ./tools/middleware.ts ./
#COPY ./tools/nextjs/ ./
#COPY ./tools/page.tsx ./src/app/page.tsx

# Comment in dev mod
RUN yarn build

EXPOSE 3000

# Comment in dev mod
CMD ["yarn", "start"]

#CMD ["yarn", "dev"]
