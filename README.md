# CS3203 Assignment 1

## Instructions to Get Running:

### Update packages:
- Open project (preferably inside VSCode) with both backend and frontend folders visible
- Open console by (Control + `) shortcut
- change directory to front end (cd frontend)
- install packages (npm install)
- go back to main directory (cd ..)
- change directory to back end (cd backend)
- install packages (npm install)

### Start frontend and backend:
- inside of /backend directory, start backend (npm start)
- open new terminal (Control + shift + `)
- make sure directory is inside frontend (cd frontend)
- start frontend react app (npm start)
- window should automatically open to localhost:3001

## Information about the program
- Even though web developer tools says requests are are sent to localhost:3001, requests are sent to localhost:3000. 
- It says this because all requests are proxied to localhost:3000, set inside package.json in the frontend.
- You can verify all requests go to localhost:3000 using a program like Insomnia or Postman.
- Most of the html of the front end resides inside App.js. Technically, all of App.js does get rendered inside index.html, since index.html contains the root DOM element. This is kind of messy since it was my first time using React, but all the functions for the front end also reside inside App.js. Index.js is just the entry point for the frontend that communicates the contents of App.js to index.html.
