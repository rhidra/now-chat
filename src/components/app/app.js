import React from 'react';
import Chat from '../chat';
import SideBar from '../side-bar';
import {Container, Row, Col, Navbar} from 'react-bootstrap';

function App() {
  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Now Chat !</Navbar.Brand>
    </Navbar>

    <Container fluid className="app">
      <Row>
        <Col>
          <Chat/>
        </Col>
        <Col md="3">
          <SideBar/>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
