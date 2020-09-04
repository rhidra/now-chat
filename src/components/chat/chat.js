import React from 'react';
import MessageForm from '../message-form';
import ChatView from '../chat-view';

function Chat({status, history, onSendData, users}) {
  return (
    <div className='chat'>
      <ChatView history={history} users={users}/>
      <MessageForm status={status} onSubmit={data => onSendData(data)}/>
    </div>
  );
}
  
export default Chat;