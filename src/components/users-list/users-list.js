import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUsers } from '../../redux/user';

function UsersList({targetId, onConnect, onDisconnect}) {
  const status = useSelector(s => s.chat.status);
  const username = useSelector(s => s.user.username);
  const users = useSelector(s => s.user.users);
  const isLoading = useSelector(s => s.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setInterval(() => dispatch(refreshUsers()), 5000);
    dispatch(refreshUsers());
    return () => clearInterval(timerId);
  }, [dispatch]);

  return (
    <div>
      {status === 'error' && <div className="alert-error">Error ! Are you sure this ID exists ?</div>}
      {status === 'connected' && <div className="alert-success">You are connected to another user !</div>}
      {status === 'disconnected' && <div className="alert-info">You are disconnected. Select another user and start chatting !</div>}

      <div className="your-id">
        Your ID: {username}
      </div>

      <button type="button" onClick={() => dispatch(refreshUsers())} disabled={isLoading}>
        Refresh user list
      </button>

      {isLoading && 
        <div className="loading">
          Loading...
        </div>
      }

      <h2>Users connected:</h2>
      <ul>
        {users.length === 0 && 'No user currently online'}

        {users.map(user => {
          if (user.peerId === username) { return <Fragment key={user.peerId}></Fragment>; } 
          return (
            <li key={user.peerId} className={(user.peerId === targetId ? 'selected ' : '') + 'user'} onClick={() => onConnect(user)}>
              {user.username} ({user.peerId})
            </li>
          );
        })}
      </ul>

      {status === 'connected' && 
        <button type="button" onClick={() => onDisconnect()} className="danger">
          Disconnect
        </button>
      }
    </div>
  );
}

export default UsersList;