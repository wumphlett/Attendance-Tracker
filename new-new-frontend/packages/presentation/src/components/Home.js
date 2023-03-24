import React, { Component } from "react";

import { Button, Card, H3, H4, H5, TextField } from 'ui-neumorphism'
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
  
  .presentation-form-title {
    text-align: center;
    margin: 1em;
  }
  
  .presentation-wrapper {
    width: 100%;
  }
  
  .presentation-question {
    height: 300px;
    text-align: center;
    margin: 1em;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
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
    sessionConnected: false,
    joinCode: "",
    sessionId: "",
    question: "",
    questionIdx: -1,
    answers: [],
    isAcceptingResponses: false,
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
    axios.get('http://127.0.0.1:8000/api/sessions/join/', {params: {token: this.state.joinCode}})
      .then((r) => {
        console.log(r);
        this.setState(
          {
            sessionConnected: true,
            sessionId: r.data.url,
            question: r.data.current_question !== null ? r.data.current_question.text : "",
            questionIdx: r.data.current_question !== null ? r.data.current_question.index + 1 : 1,
            answers: r.data.current_question !== null ? r.data.current_question.answer_set : [],
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
          <form className="presentation-form" onSubmit={this.onResponseClicked}>
            <div>
              <H4 className="presentation-form-title">Presentation</H4>
              <Button>Next</Button>
            </div>
            <div className="presentation-form-content">
              {this.state.isAcceptingResponses ? (
                <div className="presentation-wrapper">
                  <div className="presentation-question">
                    <H3>{this.state.question}</H3>
                  </div>
                  <div className="presentation-answers">
                    {[...Array(4)].map((x, i) =>
                      i < this.state.answers.length ? (
                        <Card>{this.state.answers[i].text}</Card>
                      ) : (
                        <Card>-</Card>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="presentation-answers">
                  <H3>Question {this.state.questionIdx}</H3>
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
