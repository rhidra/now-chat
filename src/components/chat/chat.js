import React from 'react';
import MessageForm from '../message-form';
import ChatView from '../chat-view';

class Chat extends React.Component {
  handleSubmit(msg) {
    this.props.chatProxy.send(msg);
  }

  render() {
    return (
      <div className='chat'>
        <ChatView/>
        <MessageForm onSubmit={msg => this.handleSubmit(msg)}/>
      </div>
    );
  }
}
  
export default Chat;