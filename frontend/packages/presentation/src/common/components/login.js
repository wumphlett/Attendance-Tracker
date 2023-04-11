import React, { Component } from "react";

import {Button, Card, H4, TextField} from 'ui-neumorphism'

import axios from "axios";
import styled from "styled-components";


const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  
  .auth-form {
    width: 420px;
  }
  
  .auth-form-content {
    padding-left: 12%;
    padding-right: 12%;
  }
  
  .auth-form-title {
    text-align: center;
    margin: 1em;
  }
  
  .auth-form-input div {
    width: 100%;
  }
  
  .auth-form-submit {
    margin: 4px 12px 18px 12px;
  }
`;


class Login extends Component {
  state = {
    email: "",
    password: "",
  }

  onButtonClicked = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:8000/token/', user)
      .then(r => {
        console.log(r);
        localStorage.clear();
        localStorage.setItem('access_token', r.data.access);
        localStorage.setItem('refresh_token', r.data.refresh);

        window.location.href = '/presentation/'
      });
  };

  render() {
    return (
      <StyledContent>
        <Card>
          <form className="auth-form" onSubmit={this.onButtonClicked}>
            <div className="auth-form-content">
              <H4 className="auth-form-title">Sign In</H4>
              <TextField
                className="auth-form-input"
                placeholder="Email"
                name="email"
                type="text"
                value={this.state.email}
                required
                onChange={e => this.setState({ email: e.value })}
                inputStyles={{ width: "100%" }}
              />
              <TextField
                className="auth-form-input"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                required
                onChange={e => this.setState({ password: e.value })}
                inputStyles={{ width: "100%" }}
              />
              <Button submit className="auth-form-submit" block bordered>Submit</Button>
            </div>
          </form>
        </Card>
      </StyledContent>
    );
  }
}

export default Login
