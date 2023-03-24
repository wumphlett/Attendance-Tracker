import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { Button, Card, H4, H5, TextField } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

import axios from 'axios';
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
  
  .response-form {
    width: 840px;
  }
  
  .response-form-content {
    display: flex;
  }
  
  .response-form-title {
    text-align: center;
    margin: 1em;
  }
  
  .response-buttons {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
  }
  
  .response-buttons div {
    height: 200px;
    width: 48%;
    margin: 1%;
    align-items: center;
    justify-content: center;
  }
  
  .response-buttons div button {
    font-size: 6em;
  }
  
  .response-waiting {
    display: flex;
    height: 420px;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
`;

// TODO RE-INIT JOIN ON ERROR
class Home extends Component {
  state = {
    sessionConnected: false,
    joinCode: "",
    sessionId: "",
    answers: [],
    isAcceptingResponses: false,
  };

  client = null;

  constructor(props) {
    super(props);

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

    if(localStorage.getItem('access_token') === null){
      window.location.href = '/login'
    }
  }

  addClientHandlers = () => {
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    this.client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data) {
        this.setState(
          {
            sessionConnected: data["sessionConnected"],
            answers: data["answers"],
            isAcceptingResponses: data["isAcceptingResponses"]
          }
        );
      }
    };
  }

  onButtonClicked = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/api/sessions/join/', {params: {token: this.state.joinCode}})
      .then((r) => {
        this.client = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + this.state.joinCode + "/");
        this.addClientHandlers();
        this.setState(
          {
            sessionConnected: true,
            sessionId: r.data.url,
            answers: (r.data.is_accepting_responses ? r.data.current_question.answer_set : []),
            isAcceptingResponses: r.data.is_accepting_responses
          }
        );
      })
      .catch(function (e) {console.log(e)});
  };

  onResponseClicked = (e) => {
    e.preventDefault();
  };

  render() {
    return (
    <StyledContent>
      {this.state.sessionConnected ? (
        <Card>
          <form className="response-form" onSubmit={this.onResponseClicked}>
            <H4 className="response-form-title">Respond</H4>
            <div className="response-form-content">
              {this.state.isAcceptingResponses ? (
                <div className="response-buttons">
                  {[...Array(4)].map((x, i) =>
                    i < this.state.answers.length ? (
                      <Button bordered onClick={() => {
                        axios.post('http://127.0.0.1:8000/api/responses/', {
                          session: this.state.sessionId,
                          answer: this.state.answers[i].url
                        }).then((r) => {
                          console.log(r)
                        })
                      }
                      }>{i+1}</Button>
                    ) : (
                      <Button bordered disabled>{i+1}</Button>
                    )
                  )}
                </div>
              ) : (
                <div className="response-waiting">
                  <H5>Wait for next question</H5>
                </div>
              )}
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <form className="join-form" onSubmit={this.onButtonClicked}>
            <div className="join-form-content">
              <H4 className="join-form-title">Join Session</H4>
              <TextField
                className="join-form-input"
                label="Join Code"
                counter={5}
                required
                onChange={(e) => {
                  this.setState({ joinCode: e.value.toUpperCase() });
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
