import React from 'react';
import MessageForm from '../message-form';
import ChatView from '../chat-view';

function Chat({onSendData}) {
  return (
    <div className='chat'>
      <ChatView/>
      <MessageForm onSubmit={data => onSendData(data)}/>
    </div>
  );
}
  
export default Chat;