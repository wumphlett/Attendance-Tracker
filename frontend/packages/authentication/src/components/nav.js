import React, { Component } from "react";

import styled from "styled-components";
import { Button } from 'ui-neumorphism'


const StyledContent = styled.div`
  .navigation {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.5rem 0;
  }
  
  .brand-name {
    text-decoration: none;
    color: black;
    font-size: 1.6rem;
    margin-left: 1rem;
    font-weight: 500;
  }
  
  .navigation-menu {
    margin-left: auto;
  }
  
  .navigation-menu ul {
    display: flex;
    padding: 0;
  }
  .navigation-menu li {
    // removes default disc bullet for li tags and applies margin to left & right side
    list-style-type: none;
    margin: 0 1rem;
  }
`;


class Navigation extends Component {
  state = {
    isAuthenticated: localStorage.getItem('access_token') !== null,
  };

  render() {
    return (
      <StyledContent>
        <nav className="navigation">
          <a href="/" className="brand-name">AUttend</a>
          <div className="navigation-menu">
            <ul>
              <li>
                {this.state.isAuthenticated ? (
                  <Button onClick={() => window.location.href='/authentication/logout'}>Logout</Button>
                ) : (
                  <Button onClick={() => window.location.href='/authentication/login'}>Login</Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </StyledContent>
    )
  }

  // render() {
  //   return (
  //     <div>
  //       <Navbar bg="dark" variant="dark">
  //         <Navbar.Brand href="/">AUttend</Navbar.Brand>
  //         <Nav className="me-auto">
  //           {this.state.isAuthenticated ? <Nav.Link href="/">Home</Nav.Link> : null}
  //         </Nav>
  //         <Nav>
  //           {this.state.isAuthenticated ? (
  //             <Nav.Link href="/logout">Logout</Nav.Link>
  //           ) : (
  //             <Nav.Link href="/login">Login</Nav.Link>
  //           )}
  //         </Nav>
  //       </Navbar>
  //     </div>
  //   )
  // }
}

export default Navigation
