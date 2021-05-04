import React, {useState} from 'react';

function UsernameForm({onSubmit}) {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username);
  }

  return (
    <form className="username-form" onSubmit={handleSubmit}>
      <label for="username">Your public username</label>
      <input name="username" value={username} onChange={e => setUsername(e.target.value)}/>
      <button type="submit">Choose</button>
    </form>
  );
}
  
export default UsernameForm;