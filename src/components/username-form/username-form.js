import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUsername } from '../../redux/user';

function UsernameForm() {
  const username = useSelector(s => s.user.username)
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => setValue(username), [username]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setValue(username);
    } else if (trimmed !== username) {
      dispatch(changeUsername(trimmed));
    }
  }

  function handleClick() {
    document.getElementById('username').focus();
  }

  return (
    <form className="username-form" onSubmit={handleSubmit} onClick={() => handleClick()}>
      <label for="username">Your are connected as</label>
      <input id="username" name="username" value={value} onChange={e => setValue(e.target.value)} onBlur={handleSubmit}/>
    </form>
  );
}
  
export default UsernameForm;