import React from 'react';
import MessageForm from '../message-form';
import ChatView from '../chat-view';

function Chat() {
  return (
    <div className='chat'>
      <ChatView/>
      <MessageForm/>
    </div>
  );
}
  
export default Chat;