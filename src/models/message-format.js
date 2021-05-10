import {v4 as uuidv4} from 'uuid';

class MessageFormat {
  static formatMessage(from, to, msg) {
    return {
      id: uuidv4(),
      type: 'message',
      from,
      to,
      data: msg,
    };
  }

  static connection(from, to) {
    return {
      id: uuidv4(),
      type: 'connection',
      from,
      to,
      data: '',
    }
  }

  static disconnection(from, to) {
    return {
      id: uuidv4(),
      type: 'disconnection',
      from,
      to,
      data: '',
    }
  }
}

export default MessageFormat;