/**
 * response.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Respond to a quiz
 */
// Main
import React from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// Components
import { Navbar } from "@frontend/common/build"
import JoinForm from "./join";
import QuizDisplay from "../components/quiz-display";
import CompletionScreen from "../components/completion-screen";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            activeQuestion: null,
            quizState: "",
            isAcceptingResponses: false,
            endTime: null,
        }
        this.client = null;
        this.existingState = null;
        this.joinAsResponder = this.joinAsResponder.bind(this);
        this.postAnswers = this.postAnswers.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId })
    }

    setQuizState = (state) => {
        this.setState( { quizState: state })
    }

    cycleQuizState = (data) => {
        if (this.state.quizState === "loading") {
            this.setQuizState("pre-response")
        }
        else if (this.state.quizState === "pre-response") {
            this.setQuizState("response")
        }
        else if (this.state.quizState === "response") {
            this.setQuizState("post-response")
        }
        else if (this.state.quizState === "post-response") {
            this.setQuizState("pre-response")
        }
    }

    setActiveQuestion = (data, callback) => {
        this.setState({
            sessionId: data.id,
            activeQuestion: data.current_question ? {
                index: data.current_question.index,
                answerChoices: data.current_question.answer_set,
                isMultipleSelectionAllowed: false,
                isAcceptingResponses: data.isAcceptingResponses,
                endTime: data.end_time
            } : null
        }, () => {
            if (callback) {
                callback();
            }
        })
    }

    postAnswers = (answers) => {
        axios.post('https://api.auttend.com/api/responses/', {
            session: this.state.sessionId,
            answer: answers[0].id
        }).then((r) => {
            if (r.data["created"]) {
                this.client.send(
                    JSON.stringify(r.data)
                );
            }
        })
    }

    addClientHandlers = () => {
        this.client.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if (data) {
                if (data.end_time === null) {
                    this.setActiveQuestion(data, () => {
                        this.cycleQuizState()
                    })
                } else {
                    this.setQuizState("completed")
                }
            }
        }
    }

    joinAsResponder = (joinCode) => {
        axios.get('sessions/join/', {params: {token: joinCode}})
            .then((r) => {
                let sessionId = r.data.id;
                this.client = new W3CWebSocket("wss://api.auttend.com/ws/" + joinCode + "/")
                this.addClientHandlers();
                this.client.onopen = () => {
                    this.client.send(JSON.stringify({ status: "joined" }))
                    axios.get(`https://api.auttend.com/api/sessions/${sessionId}/respond/`)
                        .then((r) => {
                            this.setSessionId(sessionId)
                            this.existingState = r.data
                            this.applyExistingState()
                            this.client.send(JSON.stringify(r.data))
                        });
                }
            })
    }

    applyExistingState = () => {
        // Quiz has not started yet
        if (this.existingState.current_question === null && this.existingState.end_time === null) {
            this.setActiveQuestion(this.existingState)
            this.setQuizState("loading")
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
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.quizState === "" ? (
                            <JoinForm
                                joinAsResponder={this.joinAsResponder}
                            />
                        ) : this.state.quizState !== "completed" ? (
                            <QuizDisplay
                                activeQuestion={this.state.activeQuestion}
                                quizState={this.state.quizState}
                                isAcceptingResponses={this.state.isAcceptingResponses}
                                postAnswers={this.postAnswers}
                            />
                        ) : (
                            <CompletionScreen />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;

