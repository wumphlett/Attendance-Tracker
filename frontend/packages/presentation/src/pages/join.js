/**
 * join.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Display the join code and active users in presentation
 */
// Main
import React from "react";
import axios from 'axios'
// Components
// Functions
import { joinAsPresenter } from "../functions/join-as-presenter";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class CodeDisplay extends React.Component {

    constructor(props) {
        super(props);
        const currentPath = window.location.pathname;
        this.state = {
            joinCode: currentPath.substring(currentPath.lastIndexOf('/') + 1),
            responseCount: 0
        }
        this.setSessionId = props.setSessionId;
    }
    client = null;

    addClientHandlers = (client) => {
        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data && data["created"]) {
                this.setState(
                    {
                        responseCount: this.state.responseCount + 1,
                    }
                )
            }
        };
    }

    handleJoinClick = (event) => {
        event.stopPropagation();
        joinAsPresenter(this.state.joinCode, this.client, this.addClientHandlers, this.setSessionId);
    }

    render() {
        return (
            <div className={"card d-inline-block join-form-card secondary-dark-theme p-4"}>
                <div className={"d-flex justify-content-center flex-column align-self-center"}>
                    <div className={"card label-card primary-dark-theme text-dark-theme col-12 pt-1 pb-0 px-3 text-center d-inline-block"}>
                        <h3><strong>Quiz Code:</strong></h3>
                    </div>
                    <div className={"card code-display-card col-12 mt-3 pb-0 px-3 text-center d-inline-block"}>
                        {this.state.joinCode}
                    </div>
                    <div className="card btn button-card join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center"
                         onClick={this.handleJoinClick}>
                        Start
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeDisplay;