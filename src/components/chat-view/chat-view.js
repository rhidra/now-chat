import React, { Fragment } from 'react';

function ChatView(props) {
  function getName(peerId) {
    const user = props.users.find(u => u.peerId === peerId);
    return user ? user.username : ''+peerId;
  }

  return (
    <ul className="chat-view" id="chat-view">
      {props.history.map((msg, i) => {
        let content;
        if (msg.type === 'message') {
          content = 
            <>
              <strong>{getName(msg.from)}: </strong>
              {msg.data.split('\n').map((text, j) => <Fragment key={j}>{text}<br/></Fragment>)}
            </>;
        } else if (msg.type === 'connection') {
          content = <>Started a connection with {getName(msg.to)}</>;
        } else if (msg.type === 'disconnection') {
          content = <>Disconnection !</>;
        } else {
          content = <>Unknown content type !</>;
        }

        return (
          <li key={msg.id} className={msg.type}>
            {content}
          </li>
        );
      })}
    </ul>
  );
}
  
export default ChatView;