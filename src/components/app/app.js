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
      history: [],
    }
    this.chatProxy = new ChatProxy();
  }

  componentDidMount() {
    this.chatProxy.onChangeUsername(username => this.setState({username}));
    this.chatProxy.onConnected(() => this.setState({status: 'connected'}));
    this.chatProxy.onDataReceived(data => this.setState({history: this.state.history.concat([data])}))
  }

  // Connect the client to another client with its id
  handleConnect(id) {
    this.setState({status: 'loading'})
    this.chatProxy.connect(id)
      .then(() => this.setState({status: 'connected'}))
      .catch(() => this.setState({status: 'error'}));
  }

  handleSendData(data) {
    data = this.chatProxy.preprocessData(data);
    this.chatProxy.send(data);
    this.setState({history: this.state.history.concat([data])});
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
