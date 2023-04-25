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
            recordedResponses: props.recordedResponses,
            currentlyJoined: props.currentlyJoined,
            timeElapsed: 0
        }
        this.onNextClicked = props.onNextClicked
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentlyJoined !== prevState.currentlyJoined) {
            this.setState({currentlyJoined: nextProps.currentlyJoined})
        }
        if (nextProps.recordedResponses !== prevState.recordedResponses) {
            this.setState({recordedResponses: nextProps.recordedResponses})
        }
    }

    render() {
        return (
            <div className={"card secondary-dark-theme text-dark-theme d-flex flex-row align-items-center p-2"}>
                <div className={"col-4"}>
                    <strong>Responses:   {this.state.recordedResponses} / {this.state.currentlyJoined}</strong>
                </div>
                <div className={"col-4"}><strong>Time Elapsed:   {this.state.timeElapsed}s</strong></div>
                <div className={"col-4"}>
                    <div className="card btn button-card control-button primary-dark-theme text-dark-theme col-12"
                         onClick={this.onNextClicked}>
                        Next
                    </div>
                </div>
            </div>
        )
    }
}

export default ControlCard;