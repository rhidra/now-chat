import {v4 as uuidv4} from 'uuid';

class MessageFormat {
  constructor(username, peerId) {
    this.username = username;
    this.peerId = peerId;
  }

  formatMessage(msg) {
    return {
      id: uuidv4(),
      type: 'message',
      from: this.username,
      to: this.peerId,
      data: msg,
    };
  }

  connection() {
    return {
      id: uuidv4(),
      type: 'connection',
      from: this.username,
      to: this.peerId,
      data: '',
    }
  }

  disconnection() {
    return {
      id: uuidv4(),
      type: 'disconnection',
      from: this.username,
      to: this.peerId,
      data: '',
    }
  }
}

export default MessageFormat;