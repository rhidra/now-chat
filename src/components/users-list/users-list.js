import React, {Fragment} from 'react';

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
        {this.props.status === 'error' && <div className="alert-error">Error ! Are you sure this ID exists ?</div>}
        {this.props.status === 'connected' && <div className="alert-success">You are connected to another user !</div>}
        {this.props.status === 'disconnected' && <div className="alert-info">You are disconnected. Select another user and start chatting !</div>}

        <div className="your-id">Your ID: {this.props.username}</div>

        <button type="button" onClick={() => this.refreshUsersList()} disabled={this.state.isLoading}>
          Refresh user list
        </button>

        {this.state.isLoading && <div className="loading">Loading...</div>}

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

        {this.props.status === 'connected' && <button type="button" onClick={() => this.props.onDisconnect()} className="danger">Disconnect</button>}
      </div>
    );
  }
}

export default UsersList;