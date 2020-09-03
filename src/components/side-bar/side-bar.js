import React, {useState} from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, Alert } from 'react-bootstrap';

function SideBar({status, onConnect, onDisconnect, username, targetId}) {
  const [id, setId] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onConnect(id);
  }

  console.log(targetId);
  if (status === 'connected' && targetId && targetId !== id) {
    setId(targetId);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {status === 'error' && <Alert variant="danger">Error ! Are you sure this ID exists ?</Alert>}
      {status === 'connected' && <Alert variant="success">You are connected to another user !</Alert>}
      {status === 'disconnected' && <Alert variant="info">You are disconnected. Enter another user ID to start chatting.</Alert>}

      <FormGroup>
        <FormLabel>Your ID</FormLabel>
        <FormControl type="text" disabled value={username}/>
      </FormGroup>

      <FormGroup>
        <FormLabel>Target ID</FormLabel>
        <FormControl value={id} onChange={e => setId(e.target.value)} type="text" disabled={status !== 'disconnected'}/>
      </FormGroup>

      {(status === 'disconnected' || status === 'error') && <Button type="submit">Connect to the target</Button>}
      {status === 'loading' && <Button type="submit" disabled>Connecting ...</Button>}
      {status === 'connected' && <Button type="submit" disabled variant="success">Connected</Button>}

      {status === 'connected' && <Button type="button" onClick={() => onDisconnect()} variant="danger">Disconnect</Button>}
    </Form>
  );
}
  
export default SideBar;