const express = require('express');
const cors = require('cors');
const PeerServer = require('peer').PeerServer;

const USER_CONNECTED = 'user-connected';
const USER_DISCONNECTED = 'user-disconnected';
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(__dirname + '/build'));

console.log('Listening on port', port);

const users = [];

const peerServer = new PeerServer({ port: 9000, path: '/chat' });

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

app.listen(port);
