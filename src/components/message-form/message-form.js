import React from 'react';
import {FormControl, Button, InputGroup} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function MessageForm() {
  return (
    <InputGroup>
      <FormControl as="textarea" rows="3"/>
      <InputGroup.Append>

      <Button variant="primary">
        Send <Icon.CheckCircleFill/>
      </Button>

      </InputGroup.Append>
    </InputGroup>
  );
}

export default MessageForm;