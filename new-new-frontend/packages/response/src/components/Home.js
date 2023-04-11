import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {Button, Card, H3, H4, H5, TextField} from 'ui-neumorphism'
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
    joinCode: "",
    sessionId: null,
    question: null,
    isAcceptingResponses: false,
    endTime: null
  };

  client = null;

  constructor(props) {
    super(props);

    if(localStorage.getItem('access_token') === null){
      console.log("Executing...");
      axios.get('/accounts/login/').then(r => {
        console.log("Success");
        console.log(r);
      }).catch(r => {
        console.log("Error");
        console.log(r);
      })

      const queryParams = new URLSearchParams(window.location.search);

      console.log(window.location.search);

      const user = {
        ticket: queryParams.get("ticket"),
        service: ""
      }

      axios.post('/token/', user)
      .then(r => {
        console.log(r);
        localStorage.clear();
        localStorage.setItem('access_token', r.data.access);
        localStorage.setItem('refresh_token', r.data.refresh);
      });
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  }

  addClientHandlers = () => {
    this.client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data) {
        this.updateSlide(data);
      }
    };
  }

  updateSlide = (data) => {
    this.setState(
      {
        sessionId: data.url,
        question: data.current_question,
        isAcceptingResponses: data.is_accepting_responses,
        endTime: data.end_time,
      }
    );
  };

  onJoinClicked = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/api/sessions/join/', {params: {token: this.state.joinCode}})
      .then((r) => {
        let sessionId = r.data.url;
        this.client = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + this.state.joinCode + "/");
        this.addClientHandlers();
        axios.get(`${sessionId}respond/`)
          .then((r) => {
            this.updateSlide(r.data);
          });
      })
  };

  onResponseClicked = (e) => {
    e.preventDefault();
  };

  render() {
    return (
    <StyledContent>
      {this.state.sessionId ? (
        <Card>
          <form className="response-form" onSubmit={this.onResponseClicked}>
            <H4 className="response-form-title">Respond</H4>
            <div className="response-form-content">
              {this.state.question === null ? (
                <div className="response-waiting">
                  {this.state.endTime === null ? (
                    <H3>Get Ready</H3>
                  ) : (
                    <H3>Finished</H3>
                  )}
                </div>
              ) : this.state.isAcceptingResponses ? (
                <div className="response-buttons">
                  {[...Array(4)].map((x, i) =>
                    i < this.state.question.answer_set.length ? (
                      <Button bordered onClick={() => {
                        axios.post('http://127.0.0.1:8000/api/responses/', {
                          session: this.state.sessionId,
                          answer: this.state.question.answer_set[i].url
                        }).then((r) => {
                          if (r.data["created"]) {
                            this.client.send(
                              JSON.stringify(r.data)
                            );
                          }
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
                  <H5>Question {this.state.question.index + 1}</H5>
                </div>
              )}
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <form className="join-form" onSubmit={this.onJoinClicked}>
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
