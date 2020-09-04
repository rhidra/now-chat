import React, {Fragment} from 'react';
import { FormGroup, FormControl, FormLabel, Button, Alert, Spinner } from 'react-bootstrap';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  async refreshUsersList() {
    this.setState({isLoading: true});
    await this.props.updateUsers();
    this.setState({isLoading: false});
  }

  render() {
    return (
      <div>
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
          {this.props.users.length === 0 && 'No user currently online'}

          {this.props.users.map((user, key) => {
            if (user.peerId === this.props.username) { return <Fragment key={user.peerId}></Fragment>; } 
            return (
              <li key={user.peerId} className={(user.peerId === this.props.targetId ? 'selected ' : '') + 'user'} onClick={() => this.props.onConnect(user)}>
                {user.username} ({user.peerId})
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