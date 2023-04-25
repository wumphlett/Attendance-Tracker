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
import CodeDisplay from "../components/code-display";
import CounterCard from "../components/counter-card";
import QuizDisplay from "../components/quiz-display";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"
import JoinScreen from "../components/join-screen";

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            client: null,
            currentlyJoined: 0,
            quizState: "loading"
        }
        this.setSessionId = this.setSessionId.bind(this);
        this.setClient = this.setClient.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId });
    }

    setClient = (client) => {
        this.setState({ client: client });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
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
                                />
                            ) : this.state.quizState !== "completed" ? (
                                <QuizDisplay
                                    sessionId={this.state.sessionId}
                                    client={this.state.client}
                                    setClient={this.setClient}
                                    currentlyJoined={this.state.currentlyJoined}
                                    quizState={this.state.quizState}
                                    setQuizState={this.setQuizState}
                                />
                            ) : (
                                <div></div>
                            )}
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation