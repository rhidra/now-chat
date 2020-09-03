import Peer from 'peerjs';
import {v4 as uuidv4} from 'uuid';

class ChatProxy {
  constructor() {
    this.peer = new Peer();
    this.username = 'anonymous';
    this.conn = null;
    this.dataReceivedCb = () => {};
    this.changeUsernameCb = () => {};
    this.connectedCb = () => {};
    this.errorCb = () => {};
    this.disconnectedCb = () => {};

    // Connected to the PeerJS server
    this.peer.on('open', id => this.setUsername(id));

    // A new connection is received
    this.peer.on('connection', conn => this.setConnection(conn));

    this.peer.on('error', err => {
      console.error('Error PeerJS :', err);
      this.errorCb(err);
    });
    this.peer.on('disconnected', () => this.disconnect());
    this.peer.on('close', () => this.disconnect());
  }

  connect(otherId) {
    console.log('Connecting to ', otherId, 'as', this.username);
    const conn = this.peer.connect(otherId);

    return new Promise((resolve, reject) => {
      conn.on('open', () => {
        this.setConnection(conn);
        resolve();
      })
      this.errorCb = reject;
    });
  }

  setUsername(id) {
    console.log('Set username', id);
    this.username = id;
    this.changeUsernameCb(this.username);
  }

  onChangeUsername(fun) {
    this.changeUsernameCb = fun;
  }

  setConnection(conn) {
    console.log('Connected to', conn);
    this.conn = conn;
    this.conn.on('data', data => {
      console.log('Data received:', data)
      this.dataReceivedCb(data)
    });
    this.conn.on('error', err => {
      console.error('PeerJS Connection Error:', err);
      this.errorCb(err);
    });
    this.conn.on('close', () => this.disconnect());

    setTimeout(() => this.connectedCb(conn), 100);
  }

  disconnect() {
    if (this.conn && this.conn.open) {
      this.conn.close();
    }

    this.disconnectedCb();
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

  preprocessData(msg) {
    return {
      id: uuidv4(),
      from: this.username,
      to: this.conn.peer,
      data: msg,
    };
  }

  get targetId() {
    return this.conn ? (this.conn.open ? this.conn.peer : null) : null;
  }
}

export default ChatProxy;