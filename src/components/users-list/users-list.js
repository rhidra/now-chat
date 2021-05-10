import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUsers } from '../../redux/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function UsersList({targetId, onConnect, onDisconnect}) {
  const status = useSelector(s => s.chat.status);
  const users = useSelector(s => s.user.users);
  const isLoading = useSelector(s => s.user.isLoading);
  const userId = useSelector(s => s.chat.chatProxy?.username);
  const dispatch = useDispatch();

  const connectedUsers = users.filter(u => u.peerId !== userId);

  useEffect(() => {
    const timerId = setInterval(() => dispatch(refreshUsers()), 5000);
    setTimeout(() => dispatch(refreshUsers()), 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <div className="users-list">
      <h2>Users connected:</h2>
      <ul>
        {connectedUsers.length === 0 && 'No user currently online'}

        {connectedUsers.map(user => (
          <li key={user.peerId} className={(user.peerId === targetId ? 'selected ' : '') + 'user'} onClick={() => onConnect(user)}>
            {user.username} ({user.peerId})
          </li>
        ))}
      </ul>

      {status === 'connected' && 
        <button type="button" onClick={() => onDisconnect()} className="danger">
          Disconnect
        </button>
      }

      <footer>
        <button type="button" onClick={() => dispatch(refreshUsers())} disabled={isLoading}>
          <FontAwesomeIcon icon={faSync}/>
        </button>
        <div className={`status-indicator ${isLoading ? 'loading' : ''}`}/>
      </footer>
    </div>
  );
}

export default UsersList;