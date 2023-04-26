/**
 * code-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Display the join code and active users in presentation
 */
// Main
import React from "react";
import axios from 'axios'
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class CodeDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            responseCount: 0
        }
        this.joinCode = props.joinCode
        this.setQuizState = props.setQuizState;
        this.onJoinClicked = props.onJoinClicked
    }

    render() {
        return (
            <div className={"card d-inline-block join-form-card secondary-dark-theme p-4"}>
                <div className={"d-flex justify-content-center flex-column align-self-center"}>
                    <div className={"card label-card primary-dark-theme text-dark-theme col-12 pt-1 pb-0 px-3 text-center d-inline-block"}>
                        <h3><strong>Quiz Code:</strong></h3>
                    </div>
                    <div className={"card code-display-card col-12 mt-3 pb-0 px-3 text-center d-inline-block"}>
                        {this.joinCode}
                    </div>
                    <div className="card btn button-card join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center"
                         onClick={this.onJoinClicked}>
                        Start
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeDisplay;