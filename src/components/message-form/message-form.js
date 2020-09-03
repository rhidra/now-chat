import React from 'react';
import {FormControl, Button, InputGroup, Form} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({value: ''});
  }

  handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <FormControl as="textarea" rows="3" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>

          <InputGroup.Append>
            <Button variant={this.props.status === 'connected' ? 'primary' : 'danger'} type="submit" disabled={this.props.status !== 'connected'}>
              Send <Icon.CheckCircleFill/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    );
  }
}

export default MessageForm;