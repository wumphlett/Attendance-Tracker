/**
 * join-screen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
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
            currentlyJoined: props.currentlyJoined,
            quizState: props.quizState
        }
        this.joinCode = props.joinCode
        this.setQuizState = props.setQuizState;
        this.onJoinClicked = props.onJoinClicked
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
                    joinCode={this.joinCode}
                    setQuizState={this.setQuizState}
                    onJoinClicked={this.onJoinClicked}
                />
                <CounterCard
                    currentlyJoined={this.state.currentlyJoined}
                />
            </div>
        )
    }
}

export default JoinScreen;