import React from 'react';
import { FormGroup, FormControl, FormLabel, Button, Alert, Spinner } from 'react-bootstrap';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.timerRefreshUsers = setInterval(() => this.refreshUsersList(), 5000);
    this.refreshUsersList();
  }

  componentWillUnmount() {
    clearInterval(this.timerRefreshUsers);
  }

  refreshUsersList() {
    this.setState({isLoading: true});
    fetch(process.env.NODE_ENV === 'production' ? 'https://now-chat-1.herokuapp.com/users' : 'http://localhost:3001/users')
      .then(data => data.json())
      .then(data => this.setState({users: data, isLoading: false}));
  }

  render() {
    return (
      <div onSubmit={this.props.handleSubmit}>
        {this.props.status === 'error' && <Alert variant="danger">Error ! Are you sure this ID exists ?</Alert>}
        {this.props.status === 'connected' && <Alert variant="success">You are connected to another user !</Alert>}
        {this.props.status === 'disconnected' && <Alert variant="info">You are disconnected. Select another user and start chatting !</Alert>}

        <FormGroup>
          <FormLabel>Your ID</FormLabel>
          <FormControl type="text" disabled value={this.props.username}/>
        </FormGroup>

        <Button type="button" onClick={() => this.refreshUsersList()} disabled={this.state.isLoading}>Refresh user list</Button>
        
        <Spinner animation="border" className={this.state.isLoading ? '' : 'invisible'}></Spinner>

        <h2>Users connected:</h2>
        <ul>
          {this.state.users.length === 0 && 'No user currently online'}

          {this.state.users.map((user, key) => {
            if (user === this.props.username) { return <></>; } 
            return (
              <li key={key} className={user === this.props.targetId ? 'selected' : ''} onClick={() => this.props.onConnect(user)}>
                {user}
              </li>
            );
          })}
        </ul>

        {this.props.status === 'connected' && <Button type="button" onClick={() => this.props.onDisconnect()} variant="danger">Disconnect</Button>}
      </div>
    );
  }
}
  
export default UsersList;