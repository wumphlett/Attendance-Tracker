import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


class Navigation extends Component {
  state = {
    isAuthenticated: false,
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">AUttend</Navbar.Brand>
          <Nav className="me-auto">
            {this.state.isAuthenticated ? <Nav.Link href="/">Home</Nav.Link> : <p>No</p>}
          </Nav>
          <Nav>
            {this.state.isAuthenticated ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default Navigation
