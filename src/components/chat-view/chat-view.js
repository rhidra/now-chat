import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

function ChatView() {
  const users = useSelector(s => s.user.users);
  const history = useSelector(s => s.chat.history);
  const userId = useSelector(s => s.chat.chatProxy.username);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById('chat-view');
      element.scrollTop = element.scrollHeight;
    }, 100);
  }, [history]);

  function getName(peerId) {
    const user = users.find(u => u.peerId === peerId);
    return user ? user.username : `${peerId}`;
  }

  return (
    <ul className="chat-view" id="chat-view">
      {history.map((msg, i) => {
        let content;
        if (msg.type === 'message') {
          content = 
            <>
              <div className="from">{getName(msg.from)}</div>
              <div className="bubble">
                {msg.data.split('\n').map((text, j) => <Fragment key={j}>{text}<br/></Fragment>)}
              </div>
            </>;
        } else if (msg.type === 'connection') {
          content = <>Started a connection with <strong>{getName(msg.to)}</strong></>;
        } else if (msg.type === 'disconnection') {
          content = <>Disconnection !</>;
        } else {
          content = <>Unknown content type !</>;
        }

        return (
          <li key={msg.id} className={`${msg.type} ${msg.from === userId ? 'own' : ''}`}>
            {content}
          </li>
        );
      })}
    </ul>
  );
}
  
export default ChatView;