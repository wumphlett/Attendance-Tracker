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
        this.setResponseCount = this.setResponseCount.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.joinAsPresenter = this.joinAsPresenter.bind(this);
    }
    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId }, () => {
            console.log(this.state.sessionId)
        })
    }
    setResponseCount = (responseCount) => {
        this.setState({ responseCount: responseCount });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
    }

    addClientHandlers = () => {
        this.client.onmessage = (message) => {
            console.log(message)
            const data = JSON.parse(message.data);
            if (data && data["created"]) {
                console.log(data)
                this.setState({ responseCount: this.state.responseCount + 1 })
            }
        };
    }

    joinAsPresenter(joinCode) {
        axios.get('sessions/join/', {params: {token: joinCode}})
            .then((r) => {
                let sessionId = r.data.id;
                this.client = new W3CWebSocket("wss://api.auttend.com/ws/" + joinCode + "/?presenter");
                this.client.onopen = () => {
                    this.addClientHandlers()
                    axios.get(`sessions/${sessionId}/`)
                        .then((r) => {
                            this.setSessionId(r.data.id)
                        });
                }
            });
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                                <JoinScreen
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setQuizState={this.setQuizState}
                                    joinAsPresenter={this.joinAsPresenter}
                                />
                            ) : this.state.quizState !== "completed" ? (
                                <QuizDisplay
                                    sessionId={this.state.sessionId}
                                    client={this.client}
                                    responseCount={this.state.responseCount}
                                    setResponseCount={this.setResponseCount}
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setQuizState={this.setQuizState}
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

export default Presentation