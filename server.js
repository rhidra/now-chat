const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PeerServer = require('peer').ExpressPeerServer;

const USER_CONNECTED = 'user-connected';
const USER_DISCONNECTED = 'user-disconnected';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.static(__dirname + '/build'));

const server = app.listen(port);
console.log('Listening on port', port);

const peerServer = new PeerServer(server);
app.use('/peerjs', peerServer);

const users = [];
peerServer.on('connection', (id) => {
  console.log('User connected with #', id.id);
  users.push(id.id);
});

peerServer.on('disconnect', (id) => {
  console.log('User disconnected with #', id.id);
  const idx = users.indexOf(id.id);
  if (idx !== -1) {
    users.splice(idx, 1);
  }
});

app.get('/users', (req, res) => {
  return res.json(users);
});

