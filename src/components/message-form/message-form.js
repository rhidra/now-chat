import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function MessageForm({onSubmit}) {
  const [value, setValue] = useState('');
  const status = useSelector(s => s.chat.status);

  const isConnected = status === 'connected';

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <div className={`textarea-wrapper ${isConnected ? 'connected' : ''}`}>
        <textarea 
          rows="1" 
          value={value}
          onChange={e => setValue(e.target.value)} 
          onKeyDown={e => (e.key === 'Enter' && !e.shiftKey) ? handleSubmit(e) : null} 
          disabled={!isConnected}
          placeholder={isConnected ? 'Let\'s chat !' : ''}
        />

        <button className={isConnected ? 'primary' : 'danger'} type="submit" disabled={!isConnected}>
          <FontAwesomeIcon icon={faPaperPlane}/>
        </button>
      </div>
    </form>
  );
}

export default MessageForm;