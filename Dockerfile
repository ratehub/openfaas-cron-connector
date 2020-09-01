FROM node:12.16-alpine

ARG VCS_REF
ARG VERSION
ARG BUILD_DATE

LABEL "maintainer"="ratehub.ca"

LABEL org.label-schema.vcs-ref="$VCS_REF" \
      org.label-schema.vcs-url="https://github.com/ratehub/openfaas-cron-connector"\
      org.label-schema.build-date="$BUILD_DATE"\
      org.label-schema.version="$VERSION"\
      org.label-schema.description="Node.js based cron connector for OpenFaaS"

# Create app directory
WORKDIR /usr/src/app
COPY ./ ./

RUN apk add --update \
   curl \
   bash \
 && rm -rf /var/cache/apk/*

RUN npm install && npm cache clean --force
COPY . .

CMD [ "npm", "start" ]
