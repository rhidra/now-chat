import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUsers } from '../../redux/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { disconnect, connect } from '../../redux/chat';

function UsersList() {
  const dispatch = useDispatch();
  const status = useSelector(s => s.chat.status);
  const users = useSelector(s => s.user.users);
  const isLoading = useSelector(s => s.user.isLoading);
  const userId = useSelector(s => s.chat.chatProxy?.username ?? 'anonymous');
  const targetId = useSelector(s => s.chat.chatProxy?.peerId);

  const connectedUsers = users.filter(u => u.peerId !== userId);

  useEffect(() => {
    const timerId = setInterval(() => dispatch(refreshUsers()), 5000);
    setTimeout(() => dispatch(refreshUsers()), 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <>
      <h2>Users connected</h2>
      <div className="list-wrapper">
        <ul>
          {connectedUsers.length === 0 && 'No user currently online'}

          {connectedUsers.map(user => (
            <li key={user.peerId} className={(user.peerId === targetId ? 'selected ' : '') + 'user'} onClick={() => dispatch(connect(user))}>
              <span className="username">{user.username}</span>
              <span className="id">{user.peerId}</span>
            </li>
          ))}
        </ul>
      </div>

      {status === 'connected' && 
        <button type="button" onClick={() => dispatch(disconnect())} className="danger">
          Disconnect
        </button>
      }

      <footer>
        <button type="button" onClick={() => dispatch(refreshUsers())} disabled={isLoading}>
          <FontAwesomeIcon icon={faSync}/>
        </button>
        <div className={`status-indicator ${isLoading ? 'loading' : ''}`}/>
      </footer>
    </>
  );
}

export default UsersList;