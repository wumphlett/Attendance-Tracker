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
            client: null,
            activeQuestion: null,
            responseCount: 0,
            currentlyJoined: 0,
            quizState: "loading",
            isAcceptingResponses: false,
            endTime: null,
        }
        this.setSessionId = this.setSessionId.bind(this);
        this.setClient = this.setClient.bind(this);
        this.setResponseCount = this.setResponseCount.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.addClientHandlers = this.addClientHandlers.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId }, () => {
            console.log(this.state.sessionId)
        });
    }

    setClient = (client, callback) => {
        this.setState({ client: client }, () => {
            callback();
        });
    }

    setResponseCount = (responseCount) => {
        this.setState({ responseCount: responseCount });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
    }

    addClientHandlers = () => {
        this.state.client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data && data["created"]) {
                console.log(data)
                this.setState({ responseCount: this.state.responseCount + 1 })
            }
        };
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                                <JoinScreen
                                    sessionId={this.state.sessionId}
                                    client={this.state.client}
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setSessionId={this.setSessionId}
                                    setClient={this.setClient}
                                    setQuizState={this.setQuizState}
                                    addClientHandlers={this.addClientHandlers}
                                />
                            ) : this.state.quizState !== "completed" ? (
                                <QuizDisplay
                                    sessionId={this.state.sessionId}
                                    client={this.state.client}
                                    setClient={this.setClient}
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