/**
 * join-screen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 24 APR 23
 *
 * Display the quiz join code and the counter card
 */
// Main
import React from "react";
// Components
import CodeDisplay from "./code-display";
import CounterCard from "./counter-card";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class JoinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            client: props.client,
            currentlyJoined: props.currentlyJoined,
            quizState: props.quizState
        }
        this.setSessionId = props.setSessionId;
        this.setClient = props.setClient;
        this.setQuizState = props.setQuizState;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <CodeDisplay
                    sessionId={this.state.sessionId}
                    client={this.state.client}
                    setSessionId={this.setSessionId}
                    setClient={this.setClient}
                    setQuizState={this.setQuizState}
                />
                <CounterCard
                    currentlyJoined={this.state.currentlyJoined}
                />
            </div>
        )
    }
}

export default JoinScreen;