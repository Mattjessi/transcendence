# syntax=docker/dockerfile:1
# escape=\

FROM node:23.9.0-alpine3.20a@sha256:d328a006af9cd556fec56d3fb325ce8fdee988b511dfdfe90d3182bed900aecd

RUN apk update \
	&& apk upgrade \
	&& apk add vim

COPY --chown=root:root ./conf/index.html /home/frontend/index.html
COPY --chown=root:root ./conf/package-lock.json /home/frontend/package-lock.json
COPY --chown=root:root ./conf/package.json /home/frontend/package.json
COPY --chown=root:root ./conf/public /home/frontend/public
COPY --chown=root:root ./conf/src /home/frontend/src
COPY --chown=root:root ./conf/vite.config.js /home/frontend/vite.config.js

COPY --chown=root:root ./tools/init_react.sh /tmp/init_react.sh
RUN chmod +x /tmp/init_react.sh


CMD ["/tmp/init_react.sh"]
