import {v4 as uuidv4} from 'uuid';

class MessageFormat {
  constructor(chatProxy) {
    this.chatProxy = chatProxy;
  }

  formatMessage(msg) {
    return {
      id: uuidv4(),
      type: 'message',
      from: this.chatProxy.username,
      to: this.chatProxy.peerId,
      data: msg,
    };
  }

  connection() {
    return {
      id: uuidv4(),
      type: 'connection',
      from: this.chatProxy.username,
      to: this.chatProxy.peerId,
      data: '',
    }
  }

  disconnection() {
    return {
      id: uuidv4(),
      type: 'disconnection',
      from: this.chatProxy.username,
      to: this.chatProxy.peerId,
      data: '',
    }
  }
}

export default MessageFormat;