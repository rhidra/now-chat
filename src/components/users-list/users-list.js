import React, {Fragment, useCallback, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

function UsersList({targetId, updateUsers, onConnect, onDisconnect}) {
  const status = useSelector(s => s.chat.status);
  const username = useSelector(s => s.user.username);
  const users = useSelector(s => s.user.users);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => refreshUsersList(), 5000);
    refreshUsersList();

    return () => clearInterval(timerId);
  }, []);

  const refreshUsersList = useCallback(async () => {
    setIsLoading(true);
    await updateUsers();
    setIsLoading(false);
  }, [updateUsers]);

  return (
    <div>
      {status === 'error' && <div className="alert-error">Error ! Are you sure this ID exists ?</div>}
      {status === 'connected' && <div className="alert-success">You are connected to another user !</div>}
      {status === 'disconnected' && <div className="alert-info">You are disconnected. Select another user and start chatting !</div>}

      <div className="your-id">
        Your ID: {username}
      </div>

      <button type="button" onClick={() => refreshUsersList()} disabled={isLoading}>
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