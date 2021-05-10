import React, { useEffect, useState } from 'react';
import MessageForm from '../message-form';
import ChatView from '../chat-view';
import { useSelector } from 'react-redux';

function Chat({onSendData}) {
  const status = useSelector(s => s.chat.status);
  const [displayStatus, setDisplayStatus] = useState(true);

  useEffect(() => {
    if (status === 'connected') {
      setDisplayStatus(true);
      setTimeout(() => setDisplayStatus(false), 2000);
    } else {
      setDisplayStatus(true);
    }
  }, [status]);

  return (
    <div className='chat'>
      {status === 'error' && <div className={`alert-error ${displayStatus ? 'display' : ''}`}>Error ! Are you sure this ID exists ?</div>}
      {status === 'connected' && <div className={`alert-success ${displayStatus ? 'display' : ''}`}>You are connected to another user !</div>}
      {status === 'disconnected' && <div className={`alert-info ${displayStatus ? 'display' : ''}`}>You are disconnected. Select another user and start chatting !</div>}

      <ChatView/>
      <MessageForm onSubmit={data => onSendData(data)}/>
    </div>
  );
}
  
export default Chat;