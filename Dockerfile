FROM node:12.16-alpine

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
