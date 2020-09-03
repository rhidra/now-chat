import React, { Fragment } from 'react';

function ChatView(props) {
  return (
    <ul className="chat-view">
      {props.history.map((msg, i) =>
        <li key={msg.id}>
          <strong>{msg.from}: </strong>
          {msg.data}
        </li>
      )}
    </ul>
  );
}
  
export default ChatView;