import React, { Fragment } from 'react';

function ChatView(props) {
  const list = props.history.map((msg, i) => {
    let content;
    if (msg.type === 'message') {
      content = 
        <>
          <strong>{msg.from}: </strong>
          {msg.data.split('\n').map((text, j) => <Fragment key={j}>{text}<br/></Fragment>)}
        </>;
    } else if (msg.type === 'connection') {
      content = <>Started a connection with {msg.to}</>;
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
  });

  return (
    <ul className="chat-view" id="chat-view">
      {list}
    </ul>
  );
}
  
export default ChatView;