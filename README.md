Now chat
========

A small P2P chat web app built with React, SASS, Socket.io and PeerJS.
It uses WebRTC to implement a small lightweight chat system.
It includes a front end app and a NodeJS/Express server for signaling users.

A live demo hosted on Heroku: [https://now-chat-1.herokuapp.com/](https://now-chat-1.herokuapp.com/)

## Setup dev environment

After installing all the dependancies, you need to start separately the frontend and backend.

```shell script
# Install NPM front and back end dependancies
npm install

# Run the front-end React app
npm run dev

# Run the back-end
npm run server
```

By default, the server runs on the port `3001`. The frontend runs on `3000`.

## Setup prod environment

```shell script
# Install NPM front and back end dependancies
npm install

# Run the server which is also serving the frontend app
npm start
```

The app is accessible on the standard web port. 