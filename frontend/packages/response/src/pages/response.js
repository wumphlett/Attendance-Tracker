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
            client: null,
            activeQuestion: null,
            quizState: "loading",
            isAcceptingResponses: false,
            endTime: null,
        }
        this.setSessionId = this.setSessionId.bind(this);
        this.setClient = this.setClient.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.addClientHandlers = this.addClientHandlers.bind(this);
        this.setActiveQuestion = this.setActiveQuestion.bind(this);
        this.postAnswers = this.postAnswers.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId });
    }

    setClient = (client, callback) => {
        this.setState({ client: client }, () => {
            callback();
        });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state })
    }

    cycleQuizState = (data) => {
        if (this.state.quizState === "loading") {
            this.setQuizState("pre-response")
        }
        else if (this.state.quizState === "pre-response") {
            console.log("setting to response")
            this.setQuizState("response")
        }
        else if (this.state.quizState === "response") {
            console.log("setting to post-response")
            this.setQuizState("post-response")
        }
        else if (this.state.quizState === "post-response") {
            console.log("setting to pre-response")
            this.setQuizState("pre-response")
        }
    }

    addClientHandlers = (client, setActiveQuestion) => {
        client.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if (data) {
                console.log(data)
                setActiveQuestion(data, () => {
                    if (this.state.activeQuestion.endTime !== null) {
                        this.setQuizState("completed")
                    } else {
                        this.cycleQuizState()
                    }
                })
            }
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
                this.state.client.send(
                    JSON.stringify(r.data)
                );
            }
        })
    }

    render() {
        return (
            <div className={"primary-dark-theme"}>
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                            <JoinForm
                                client={this.state.client}
                                setClient={this.setClient}
                                addClientHandlers={this.addClientHandlers}
                                setActiveQuestion={this.setActiveQuestion}
                            />
                        ) : this.state.quizState !== "completed" ? (
                            <QuizDisplay
                                sessionId={this.state.sessionId}
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

