# syntax=docker/dockerfile:1
# escape=\

FROM node@sha256:bec402741e59b7f74ddf1b78bff2013c178bebd3b5cf841c202d376d5f1d738a

#Installing utils
RUN apk update \
	&& apk upgrade \
	&& apk add vim

RUN npx create-next-app@15.0.3 transcendence --typescript --eslint --tailwind \
		--src-dir --app --no-import-alias --no-turbopack --use-yarn

WORKDIR /transcendence

RUN yarn add axios
RUN yarn install

COPY ./tools/public/ ./public
COPY ./tools/app/ ./src/app/
#COPY ./tools/nextjs/ ./
#COPY ./tools/page.tsx ./src/app/page.tsx
#RUN yarn build

EXPOSE 3000

#CMD ["yarn", "start"]
CMD ["yarn", "dev"]
#CMD ["sleep", "infinity"]
