import React, { useEffect, useState } from 'react';
import Chat from '../chat';
import UsersList from '../users-list';
import UsernameForm from '../username-form';
import { addMessage, connect, disconnect, receiveConnection, sendData, receiveDisconnection } from '../../redux/chat';
import { changeUsername } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { useIsMobile } from '../../providers/viewport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


function App() {
  const isMobile = useIsMobile();
  const chatProxy = useSelector(s => s.chat.chatProxy);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Setup various callbacks
  useEffect(() => {
    if (!chatProxy) { return; }
    chatProxy.onConnected(() => dispatch(receiveConnection()));
    chatProxy.onDisconnected(() => dispatch(receiveDisconnection()));
    chatProxy.onDataReceived(data => dispatch(addMessage(data)));
  }, [chatProxy, dispatch]);

  return (
    <div className="wrapper">
      <header>
        <a href="#home" className="brand-logo">Now Chat !</a>
        <button className="sidebar-button" onClick={() => setIsSidebarOpen(o => !o)}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
      </header>

      <div className="app">
        <Chat onSendData={data => dispatch(sendData(data))}/>
        
        <div className={`sidebar ${!isMobile || isSidebarOpen ? 'open' : ''}`}>
          <UsernameForm onSubmit={username => dispatch(changeUsername(username))}/>

          <UsersList 
            targetId={chatProxy ? chatProxy.peerId : ''}
            onConnect={user => dispatch(connect(user))}
            onDisconnect={() => dispatch(disconnect())}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
