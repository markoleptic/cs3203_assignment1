#specifying a base image: Nodejs
FROM node:12.18.1

#set a directory for the app
WORKDIR /backend

# copy all the files to the container
COPY . .
COPY package*.json ./

# install dependencies
RUN npm install

# define the port number the container should expose
EXPOSE 5000

# run the command
CMD  ["npm", "run", "dev"]

