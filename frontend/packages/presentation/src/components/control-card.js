/**
 * control-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 24 APR 23
 *
 * Get the statistics of a quiz in progess and control it
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class ControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseCount: props.responseCount,
            currentlyJoined: props.currentlyJoined,
            quizState: props.quizState,
            timeElapsed: 0,
            interval: null
        }
        this.onNextClicked = props.onNextClicked
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    // Implement Timer
    startTimer = () => {
        const interval = setInterval(() => {
            this.setState(prevState => ({
                timeElapsed: prevState.timeElapsed + 1,
            }));
        }, 1000);
        this.setState({ interval });
    }

    // Stop timer
    stopTimer = () => {
        clearInterval(this.state.interval)
    }

    handleTimer = () => {
        // Response window is now open. Start timer.
        if (this.state.quizState === "pre-response") {
            this.startTimer()
        }
        // Response window is now closed. Stop timer.
        else if (this.state.quizState === "response") {
            this.stopTimer()
        }
        // Reset the timer between questions.
        else if (this.state.quizState === "post-response") {
            this.setState({ timeElapsed: 0})
        }
    }

    onClick = (event) => {
        this.onNextClicked(event);
        this.handleTimer();
    }

    render() {
        return (
            <div className={"card secondary-dark-theme text-dark-theme d-flex flex-row align-items-center p-2"}>
                <div className={"col-8 d-flex flex-row align-items-center ps-3"}>
                    <div className={"w-100 d-flex flex-row"}>
                        <div className={"col-6"}>
                            <strong>Responses:   {this.state.responseCount} / {this.state.currentlyJoined}</strong>
                        </div>
                        <div className={"col-6"}><strong>Time Elapsed:   {this.state.timeElapsed}s</strong></div>
                    </div>
                </div>
                <div className={"col-4"}>
                    {this.state.quizState === "pre-response" ? (
                        <div className="card btn button-card control-button start primary-dark-theme text-dark-theme col-12"
                             onClick={this.onClick}>
                            Start
                        </div>
                    ) : this.state.quizState === "response"? (
                        <div className="card btn button-card control-button stop primary-dark-theme text-dark-theme col-12"
                             onClick={this.onClick}>
                            Stop
                        </div>
                    ) : (
                        <div className="card btn button-card control-button main primary-dark-theme text-dark-theme col-12"
                             onClick={this.onClick}>
                            Next
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ControlCard;