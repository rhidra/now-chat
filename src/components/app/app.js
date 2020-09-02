import React from 'react';
import Chat from '../chat';
import SideBar from '../side-bar';
import {Container, Row, Col, Navbar} from 'react-bootstrap';
import ChatProxy from '../../models/chat-proxy';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'pending',
      username: 'anonymous',
    }
    this.chatProxy = new ChatProxy();
  }

  componentDidMount() {
    this.chatProxy.onChangeUsername(username => this.setState({username}));
    this.chatProxy.onConnected(() => this.setState({status: 'connected'}));
  }

  // Connect the client to another client with its id
  handleConnect(id) {
    this.setState({status: 'loading'})
    this.chatProxy.connect(id)
      .then(() => this.setState({status: 'connected'}))
      .catch(() => this.setState({status: 'error'}));
  }

  render(){
    return (
      <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">Now Chat !</Navbar.Brand>
      </Navbar>

      <Container fluid className="app">
        <Row className="h-100">
          <Col className="chat-col">
            <Chat chatProxy={this.chatProxy}/>
          </Col>
          <Col md="3" className="sidebar-col">
            <SideBar status={this.state.status} 
                     username={this.chatProxy.username}
                     onConnect={id => this.handleConnect(id)}/>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default App;
