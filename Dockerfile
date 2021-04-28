FROM node:12-alpine

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

RUN npm ci && npm cache clean --force

CMD [ "npm", "start" ]
