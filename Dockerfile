FROM node:6.9.1
MAINTAINER aaronwang@rancher.com

COPY package.json /tmp/package.json
RUN npm config set registry https://registry.npm.taobao.org 
RUN cd /tmp && npm install
RUN mkdir -p /web && cp -a /tmp/node_modules /web

COPY . /web
WORKDIR /web

EXPOSE 3000

CMD ["npm run dev"]
