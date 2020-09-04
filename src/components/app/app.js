import React from 'react';
import Chat from '../chat';
import {Container, Row, Col, Navbar} from 'react-bootstrap';
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
    }
  }

  componentDidMount() {
    this.api = new ApiProxy();
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
  handleConnect(id) {
    console.log('Trying to connect to', id);
    this.setState({status: 'loading'});
    this.chatProxy.connect(id)
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

  render(){
    return (
      <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Now Chat !</Navbar.Brand>
      </Navbar>

      <Container fluid className="app">
        <Row className="h-100">
          <Col md="9" className="chat-col">
            <Chat status={this.state.status} history={this.state.history} onSendData={data => this.handleSendData(data)}/>
          </Col>

          <Col md="3" className="sidebar-col">
            <UsernameForm onSubmit={username => this.handleUpdateUsername(username)}/>

            <UsersList status={this.state.status} 
                       username={this.chatProxy ? this.chatProxy.username : ''}
                       targetId={this.chatProxy ? this.chatProxy.peerId : ''}
                       onConnect={id => this.handleConnect(id)}
                       onDisconnect={() => this.handleDisconnect()}/>
          </Col>
        </Row>
      </Container>
      </>
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
