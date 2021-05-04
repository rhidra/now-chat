import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function MessageForm({onSubmit}) {
  const [value, setValue] = useState('');
  const status = useSelector(s => s.chat.status);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
        <textarea 
          rows="1" 
          value={value} 
          onChange={e => setValue(e.target.value)} 
          onKeyDown={e => (e.key === 'Enter' && !e.shiftKey) ? handleSubmit(e) : null} 
          disabled={status !== 'connected'}
        />

        <button className={status === 'connected' ? 'primary' : 'danger'} type="submit" disabled={status !== 'connected'}>
          Send
        </button>
    </form>
  );
}

export default MessageForm;