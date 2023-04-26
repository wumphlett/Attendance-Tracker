/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 24 APR 23
 *
 * Present a quiz
 */
// Main
import React from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// Components
import { Navbar } from "@frontend/common/build"
import JoinScreen from "../components/join-screen";
import QuizDisplay from "../components/quiz-display";
import CompletionScreen from "../components/completion-screen";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            activeQuestion: null,
            responseCount: 0,
            currentlyJoined: 0,
            quizState: "loading",
            isAcceptingResponses: false,
            endTime: null,
        }
        this.client = null
        const currentPath = window.location.pathname;
        this.joinCode = currentPath.substring(currentPath.lastIndexOf('/') + 1)
        this.existingState = null;

        this.setResponseCount = this.setResponseCount.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.cycleQuizState = this.cycleQuizState.bind(this);
        this.cycleNextQuestion = this.cycleNextQuestion.bind(this);
        this.onJoinClicked = this.onJoinClicked.bind(this);

        this.joinAsPresenter(this.joinCode)
    }
    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId })
    }
    setResponseCount = (responseCount) => {
        this.setState({ responseCount: responseCount });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
    }

    cycleQuizState() {
        if (this.state.quizState === "pre-response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("response")
            })
        }
        else if (this.state.quizState === "response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("post-response")
            })

        }
        else if (this.state.quizState === "post-response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("pre-response")
                this.setResponseCount(0)
            })
        }
    }

    cycleNextQuestion(callback) {
        axios.post(`sessions/${this.state.sessionId}/next/`)
            .then((res) => {
                axios.get(`sessions/${this.state.sessionId}/respond/`)
                    .then((res) => {
                        console.log(this.client)
                        console.log(res.data)
                        this.client.send(
                            JSON.stringify(res.data)
                        );
                    });
                // Quiz is complete
                if (res.data.current_question === null) {
                    this.setQuizState("completed")
                }
                // If quiz is not complete, update the question
                else {
                    console.log(res.data)
                    this.setActiveQuestion(res.data)
                    if (typeof callback === "function") {
                        // Call the callback function
                        callback();
                    }
                }
            })
    }

    setActiveQuestion(data) {
        this.setState(  {
            activeQuestion: {
                prompt: data.current_question.text,
                index: data.current_question.index,
                answerChoices: data.current_question.answer_set,
                end_time: data.end_time,
                responseCount: 0
            },
            isAcceptingResponses: data.is_accepting_responses,
            isLoadingComplete: true
        })
    }

    addClientHandlers = () => {
        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data && data["created"]) {
                this.setState({ responseCount: this.state.responseCount + 1 })
            }
            else if (data && data["status"]) {
                this.setState({ currentlyJoined: this.state.currentlyJoined + 1})
            }
        };
    }

    joinAsPresenter(joinCode) {
        axios.get('sessions/join/', {params: {token: joinCode}})
            .then((r) => {
                let sessionId = r.data.id;
                this.client = new W3CWebSocket("wss://api.auttend.com/ws/" + joinCode + "/?presenter");
                this.addClientHandlers()
                axios.get(`sessions/${sessionId}/`)
                    .then((r) => {
                        this.setSessionId(r.data.id)
                        this.existingState = r.data
                    });
            });
    }

    onJoinClicked = (event) => {
        event.stopPropagation();
        console.log(this.existingState)

        // Quiz has not started yet
        if (this.existingState.current_question === null && this.existingState.end_time === null) {
            console.log("Quiz has not yet started")
            this.cycleNextQuestion();
            this.setQuizState("pre-response")
        }
        // Quiz was in progress and in pre-response stage
        else if (!this.existingState.is_accepting_responses && !this.existingState.is_post_responses) {
            this.setActiveQuestion(this.existingState)
            this.setQuizState("pre-response")
        }
        // Quiz was in progress and in response stage
        else if (this.existingState.is_accepting_responses) {
            this.setActiveQuestion(this.existingState)
            this.setQuizState("response")
        }
        // Qiz was in progress and in post-response stage
        else if (this.existingState.is_post_responses) {
            this.setActiveQuestion(this.existingState)
            this.setQuizState("post-response")
        }
        // Quiz was complete
        else if (this.existingState.current_question === null && this.existingState.end_time !== null) {
            this.setQuizState("completed")
        }
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.quizState === "loading" ? (
                                <JoinScreen
                                    joinCode={this.joinCode}
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setQuizState={this.setQuizState}
                                    onJoinClicked={this.onJoinClicked}
                                />
                            ) : this.state.quizState !== "completed" ? (
                                <QuizDisplay
                                    activeQuestion={this.state.activeQuestion}
                                    responseCount={this.state.responseCount}
                                    setResponseCount={this.setResponseCount}
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setQuizState={this.setQuizState}
                                    cycleQuizState={this.cycleQuizState}
                                    cycleNextQuestion={this.cycleNextQuestion}
                                />
                            ) : (
                                <CompletionScreen
                                    sessionId={this.state.sessionId}
                                />
                            )}
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation