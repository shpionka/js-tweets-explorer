FROM node:13 AS base
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

FROM base AS dependencies
RUN npm install

FROM dependencies AS release
COPY . .
RUN chmod +x /usr/src/app/wait-for-it.sh
EXPOSE 8000
CMD [ "npm", "start" ]
