import React from 'react';
import Chat from '../chat';
import ChatProxy from '../../models/chat-proxy';
import MessageFormat from '../../models/message-format';
import UsersList from '../users-list';
import UsernameForm from '../username-form';
import ApiProxy from '../../models/api-proxy';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'disconnected',
      username: 'anonymous',
      history: [],
      users: [],
    }
    this.api = new ApiProxy();
  }

  componentDidMount() {
    this.chatProxy = new ChatProxy();
    this.msgFormat = new MessageFormat(this.chatProxy);
    this.chatProxy.onChangeUsername(username => this.setState({username}));
    this.chatProxy.onConnected(() => 
      this.setState({
        status: 'connected',
        history: this.state.history.concat([this.msgFormat.connection()]),
      })
    );
    this.chatProxy.onDisconnected(() => 
      this.setState({
        status: 'disconnected', 
        history: this.state.history.concat([this.msgFormat.disconnection()]),
      })
    );
    this.chatProxy.onDataReceived(data => {
      this.setState({history: this.state.history.concat([data])})
      this.updateScroll();
    });
  }

  // Connect the client to another client with its id
  handleConnect(user) {
    console.log('Trying to connect to', user.username, user.peerId);
    this.setState({status: 'loading'});
    this.chatProxy.connect(user.peerId)
      .then(() => this.setState({status: 'connected'}))
      .catch(() => this.setState({status: 'error'}));
  }

  handleDisconnect() {
    this.setState({status: 'loading'});
    this.chatProxy.disconnect();
  }

  handleSendData(data) {
    data = this.msgFormat.formatMessage(data);
    this.chatProxy.send(data);
    this.setState({history: this.state.history.concat([data])});
    this.updateScroll();
  }

  handleUpdateUsername(username) {
    this.api.updateUsername(username, this.chatProxy.username);
  }

  async updateUsers() {
    const users = await this.api.getUsers();
    this.setState({users});
    return users;
  }

  render(){
    return (
      <div className="wrapper">
        <header>
          <a href="#home" className="brand-logo">Now Chat !</a>
        </header>

        <div className="app">
          <Chat status={this.state.status} history={this.state.history} onSendData={data => this.handleSendData(data)} users={this.state.users}/>

          <div className="sidebar">
            <UsernameForm onSubmit={username => this.handleUpdateUsername(username)}/>

            <UsersList 
              status={this.state.status} 
              username={this.chatProxy ? this.chatProxy.username : ''}
              targetId={this.chatProxy ? this.chatProxy.peerId : ''}
              users={this.state.users}
              updateUsers={() => this.updateUsers()}
              onConnect={user => this.handleConnect(user)}
              onDisconnect={() => this.handleDisconnect()}
            />
          </div>
        </div>
      </div>
    );
  }

  updateScroll() {
    setTimeout(() => {
      const element = document.getElementById('chat-view');
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
}

export default App;
