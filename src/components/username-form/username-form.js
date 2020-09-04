import React, {useState} from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, InputGroup } from 'react-bootstrap';

function UsernameForm({onSubmit}) {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(username);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel>Your public username</FormLabel>

        <InputGroup>
          <FormControl type="text" value={username} onChange={e => setUsername(e.target.value)}/>

          <InputGroup.Append>
            <Button type="submit" variant="primary">
              Choose
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
  
export default UsernameForm;