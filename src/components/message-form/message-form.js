import React from 'react';

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
      <form className="message-form" onSubmit={this.handleSubmit}>
          <textarea 
            rows="1" 
            value={this.state.value} 
            onChange={this.handleChange} 
            onKeyDown={this.handleKeyDown} 
            disabled={this.props.status !== 'connected'}
          />

          <button className={this.props.status === 'connected' ? 'primary' : 'danger'} type="submit" disabled={this.props.status !== 'connected'}>
            Send
          </button>
      </form>
    );
  }
}

export default MessageForm;