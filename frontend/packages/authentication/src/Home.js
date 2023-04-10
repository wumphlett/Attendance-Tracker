import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { Button, Card, H3, H4, TextField } from 'ui-neumorphism'
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
  
  .presentation-form {
    width: 1020px;
  }
  
  .presentation-form-content {
    display: flex;
    height: 600px;
  }
  
  .presentation-header {
    display: flex;
    align-items: center;
  }
  
  .presentation-form-title {
    text-align: center;
    margin: 1em;
  }
  
  .presentation-next-button {
    margin: 1em;
    margin-left: auto;
  }
  
  .presentation-wrapper {
    width: 100%;
  }
  
  .presentation-question {
    height: 300px;
    width: 100%;
    text-align: center;
    margin: 1em;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
  
  .presentation-counter {
    text-align: center;
  }
  
  .presentation-answers {
    display: flex;
    width: 100%;
    height: 270px;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    text-align: center;
    align-content: center;
    vertical-align: middle;
  }
  
  .presentation-answers div {
    display: flex;
    width: 48%;
    margin: 1%;
    height: 100px;
    font-size: 2em;
    align-items: center;
    justify-content: center;
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
    endTime: null,
    responseCount: 0,
  };

  client = null;

  constructor(props) {
    super(props);

    if (localStorage.getItem('access_token') === null){
      window.location.href = '/authentication/login'
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
  }

  addClientHandlers = () => {
    this.client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data && data["created"]) {
        this.setState(
          {
            responseCount: this.state.responseCount + 1,
          }
        )
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
        responseCount: 0,
      }
    );
  };

  onJoinClicked = (e) => {
    e.preventDefault();
    axios.get('http://127.0.0.1:8000/api/sessions/join/', {params: {token: this.state.joinCode}})
      .then((r) => {
        let sessionId = r.data.url;
        this.client = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + this.state.joinCode + "/?presenter");
        this.addClientHandlers();
        axios.get(sessionId)
          .then((r) => {
            this.updateSlide(r.data);
          });
      });
  };

  onNextClicked = (e) => {
    e.preventDefault();
    axios.post(`${this.state.sessionId}next/`)
      .then((r) => {
        this.updateSlide(r.data);
        axios.get(`${this.state.sessionId}respond/`)
          .then((r) => {
            this.client.send(
              JSON.stringify(r.data)
            );
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
          <form className="presentation-form" onSubmit={this.onResponseClicked}>
            <div className="presentation-header">
              <H4 className="presentation-form-title">{this.state.question ? (`Question ${this.state.question.index + 1}`) : null}</H4>
              {this.state.endTime === null ? (<Button className="presentation-next-button" onClick={this.onNextClicked}>Next</Button>) : null}
            </div>
            <div className="presentation-form-content">
              {this.state.question === null ? (
                <div className="presentation-question">
                  {this.state.endTime === null ? (
                    <H3>Get Ready</H3>
                  ) : (
                    <H3>Finished</H3>
                  )}
                </div>
              ) : this.state.isAcceptingResponses ? (
                <div className="presentation-wrapper">
                  <div className="presentation-question">
                    <H3>{this.state.question.text}</H3>
                  </div>
                  <div className="presentation-counter"><H4>Responses: {this.state.responseCount}</H4></div>
                  <div className="presentation-answers">
                    {[...Array(4)].map((x, i) =>
                      i < this.state.question.answer_set.length ? (
                        <Card>{this.state.question.answer_set[i].text}</Card>
                      ) : (
                        <Card>-</Card>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="presentation-question">
                  <H3>Question {this.state.question.index + 1}</H3>
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
