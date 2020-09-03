import React, { Fragment } from 'react';

function ChatView(props) {
  return (
    <ul className="chat-view" id="chat-view">
      {props.history.map((msg, i) =>
        <li key={msg.id}>
          <strong>{msg.from}: </strong>
          {msg.data.split('\n').map((text, j) => <Fragment key={j}>{text}<br/></Fragment>)}
        </li>
      )}
    </ul>
  );
}
  
export default ChatView;