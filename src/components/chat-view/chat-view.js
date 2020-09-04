import React, { Fragment } from 'react';

function ChatView(props) {
  return (
    <ul className="chat-view" id="chat-view">
      {props.history.map((msg, i) => {
        let content;
        if (msg.type === 'message') {
          content = 
            <>
              <strong>{props.users.find(u => u.peerId === msg.from).username}: </strong>
              {msg.data.split('\n').map((text, j) => <Fragment key={j}>{text}<br/></Fragment>)}
            </>;
        } else if (msg.type === 'connection') {
          content = <>Started a connection with {props.users.find(u => u.peerId === msg.to).username}</>;
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