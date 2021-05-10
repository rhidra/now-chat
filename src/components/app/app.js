import React, { useCallback, useEffect, useState } from 'react';
import Chat from '../chat';
import UsersList from '../users-list';
import UsernameForm from '../username-form';
import { setup } from '../../redux/api';
import { addMessage, connect, disconnect, error, loading } from '../../redux/chat';
import { updateUsername, updateUsersList } from '../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { useIsMobile } from '../../providers/viewport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'


function App() {
  const isMobile = useIsMobile();
  const chatProxy = useSelector(s => s.api.chatProxy);
  const msgFormat = useSelector(s => s.api.msgFormat);
  const api = useSelector(s => s.api.backend);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const updateScroll = useCallback(() => {
    setTimeout(() => {
      const element = document.getElementById('chat-view');
      element.scrollTop = element.scrollHeight;
    }, 100);
  }, []);

  useEffect(() => { dispatch(setup()); }, [dispatch])

  useEffect(() => {
    if (!chatProxy || !msgFormat) { return; }
    
    chatProxy.onChangeUsername(username => dispatch(updateUsername(username)));
    chatProxy.onConnected(() => dispatch(connect(msgFormat.connection())));
    chatProxy.onDisconnected(() => dispatch(disconnect(msgFormat.disconnection())));
    chatProxy.onDataReceived(data => {
      dispatch(addMessage(data));
      updateScroll();
    });
  }, [chatProxy, msgFormat, dispatch, updateScroll]);

  // Connect the client to another client with its id
  const handleConnect = useCallback((user) => {
    console.log('Trying to connect to', user.username, user.peerId);
    dispatch(loading());
    chatProxy.connect(user.peerId).catch(() => dispatch(error()));
  }, [chatProxy, dispatch]);

  const handleDisconnect = useCallback(() => {
    dispatch(loading());
    chatProxy.disconnect();
  }, [chatProxy, dispatch]);

  const handleSendData = useCallback((data) => {
    const msg = msgFormat.formatMessage(data);
    chatProxy.send(msg);
    dispatch(addMessage(msg));
    updateScroll();
  }, [chatProxy, msgFormat, dispatch, updateScroll]);

  const updateUsers = useCallback(async () => {
    if (api) {
      const users = await api.getUsers();
      dispatch(updateUsersList(users));
      return users;
    }
  }, [api, dispatch]);

  const handleUpdateUsername = useCallback(async (username) => {
    if (api) {
      await api.updateUsername(username, chatProxy.username);
      updateUsers();
    }
  }, [api, chatProxy, updateUsers]);

  return (
    <div className="wrapper">
      <header>
        <a href="#home" className="brand-logo">Now Chat !</a>
        <button className="sidebar-button" onClick={() => setIsSidebarOpen(o => !o)}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
      </header>

      <div className="app">
        <Chat onSendData={data => handleSendData(data)}/>
        
        <div className={`sidebar ${!isMobile || isSidebarOpen ? 'open' : ''}`}>
          <UsernameForm onSubmit={username => handleUpdateUsername(username)}/>

          <UsersList 
            targetId={chatProxy ? chatProxy.peerId : ''}
            updateUsers={() => updateUsers()}
            onConnect={user => handleConnect(user)}
            onDisconnect={() => handleDisconnect()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
