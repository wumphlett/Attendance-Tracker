import React, { Component } from "react";

import { Button, Card, H4, TextField } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

import axios, {Cancel} from 'axios';
import styled from "styled-components";


const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  
  .join-form {
    width: 420px;
  }
  
  .join-form-content {
    padding-left: 12%;
    padding-right: 12%;
  }
  
  .join-form-title {
    text-align: center;
    margin: 1em;
  }
  
  .join-form-input div {
    width: 100%;
    div div:last-child {
      text-align: right;
    }
  }
  
  .join-form-submit {
    margin: 4px 12px 18px 12px;
  }
`;


class Home extends Component {
  state = {
    sessionConnected: false,
    joinCode: "",
  };

  constructor(props) {
    super(props);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

    if(localStorage.getItem('access_token') === null){
      window.location.href = '/login'
    }
  }

  onButtonClicked = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/api/sessions/10/')
      .then(function (r) {console.log(r)});
  };

  onTriggerClicked = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/api/sessions/10/')
      .then(function (r) {console.log(r)});
  };

  render() {
    return (
    <StyledContent>
      {this.state.sessionConnected ? (
        <Card>
          <form className="join-form" onSubmit={this.onTriggerClicked}>
            <div className="auth-form-content">
              <H4 className="join-form-title">Trigger</H4>
              <Button
                submit
                className="join-form-submit"
                autoFocus
                block
                bordered
              >
                Trigger
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <form className="join-form" onSubmit={this.onButtonClicked}>
            <div className="auth-form-content">
              <H4 className="join-form-title">Join Session</H4>
              <TextField
                className="join-form-input"
                label="Join Code"
                counter="5"
                required
                onChange={(e) => {
                  this.setState({ joinCode: e.value });
                }}
                inputStyles={{ width: "100%" }}
              />
              <Button
                submit
                className="join-form-submit"
                autoFocus
                block
                bordered
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
      )}
    </StyledContent>
  );
  }
}

export default Home;
