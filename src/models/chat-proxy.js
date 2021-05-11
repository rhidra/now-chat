import Peer from 'peerjs';

class ChatProxy {
  constructor() {
    const id = Math.floor(Math.random()*10000);
    this.peer = new Peer(id, {
      host: process.env.NODE_ENV === 'production' ? 'now-chat-1.herokuapp.com' : 'localhost',
      port: process.env.NODE_ENV === 'production' ? 443 : 3001,
      path: '/peerjs',
    });
    this.username = 'anonymous';
    this.users = [];
    this.conn = null;
    this.dataReceivedCb = () => {};
    this.connectedCb = () => {};
    this.errorCb = () => {};
    this.disconnectedCb = () => {};

    this.peer.on('open', id => this.setUsername(id));
    this.peer.on('connection', conn => this.setConnection(conn, true));
    this.peer.on('disconnected', () => this.disconnect());
    this.peer.on('close', () => this.disconnect());
    this.peer.on('error', err => {
      console.error('Error PeerJS :', err);
      this.errorCb(err);
    });
  }

  connect(otherId) {
    console.log('Connecting to ', otherId, 'as', this.username);
    const conn = this.peer.connect(otherId);

    return new Promise(resolve => {
      conn.on('open', async () => {
        await this.setConnection(conn);
        resolve();
      });
    });
  }

  setUsername(id) {
    console.log('Set username', id);
    this.username = id;
  }

  async setConnection(conn, externalConnection=false) {
    console.log('Connected to', conn);
    if (this.conn && this.conn.open) {
      this.disconnectedCb();
      this.disconnect();
    }
    this.conn = conn;
    this.conn.on('data', data => {
      console.log('Data received:', data);
      this.dataReceivedCb(data);
    });
    this.conn.on('error', err => {
      console.error('PeerJS Connection Error:', err);
      this.errorCb(err);
    });
    this.conn.on('close', () => this.disconnect(true));

    if (externalConnection) {
      console.log(this.conn.peerId);
      setTimeout(() => this.connectedCb(conn), 5000);
    }
    return new Promise(r => setTimeout(() => r(), 100));
  }

  async disconnect(external=false) {
    if (this.conn && this.conn.open) {
      this.conn.close();
    }
    if (external) {
      this.disconnectedCb();
    }
  }

  onConnected(fun) {
    this.connectedCb = fun;
  }

  onDisconnected(fun) {
    this.disconnectedCb = fun;
  }

  onDataReceived(fun) {
    this.dataReceivedCb = fun;
  }

  send(data) {
    console.log('Sending data:', data);
    this.conn.send(data);
  }

  get peerId() {
    return this.conn ? (this.conn.open ? this.conn.peer : null) : null;
  }
}

export default ChatProxy;