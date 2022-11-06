#specifying a base image: Nodejs
FROM node:12.18.1

#set a directory for the app
WORKDIR /frontend

# copy all the files to the container
COPY package*.json ./
COPY . .

# install dependencies
RUN npm install

# run the command
CMD  ["npm", "start"]

