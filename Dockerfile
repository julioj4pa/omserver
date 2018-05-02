# parent image
FROM node:9

MAINTAINER 'Thiago Ferezim <thiagoferezim@gmail.com>'

WORKDIR /omserver
# install needed packages
COPY package*.json ./
RUN npm install

COPY . .

# available port outside the container
EXPOSE 3000

# Run when the container launches
# RUN npm start
CMD [ "npm", "start", "mongodb"]
