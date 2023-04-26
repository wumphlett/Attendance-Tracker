/**
 * join-form.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Join a quiz with a code
 */
// Main
import React from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";
// Components
// Functions
import { joinAsResponder } from "../functions/join-as-responder";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: props.client,
            codeInputValue: ''
        }
        this.setClient = props.setClient;
        this.addClientHandlers = props.addClientHandlers;
        this.setActiveQuestion = props.setActiveQuestion;
        this.inputRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.client !== prevState.client) {
            return nextProps
        }
    }

     joinAsResponder = () => {
        axios.get('sessions/join/', {params: {token: this.state.codeInputValue}})
            .then((r) => {
                let sessionId = r.data.id;
                this.setClient(new W3CWebSocket("wss://api.auttend.com/ws/" + this.state.codeInputValue + "/"), () => {
                    console.log(this.state.client)
                    this.addClientHandlers(this.state.client, this.setActiveQuestion)
                    axios.get(`https://api.auttend.com/api/sessions/${sessionId}/respond/`)
                        .then((r) => {
                            console.log(r.data)
                            this.setActiveQuestion(r.data);
                        });
                });
            })
    }

    handleInputChange = (event) => {
        const joinCode = event.target.value.replace(/[^0-9]/g, '');
        this.setState({ codeInputValue: joinCode }, () => {
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(joinCode.length, joinCode.length);
        });
    };

    handleJoinClick = (event) => {
        console.log("Joining...")
        event.stopPropagation();
        this.joinAsResponder();
        // joinAsResponder(this.state.codeInputValue, this.client, this.setClient, this.addClientHandlers, this.setActiveQuestion)
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"card secondary-dark-theme join-form-card col-12 col-sm-9 col-md-6 col-lg-5 col-xl-4"}>
                    <div className={"card primary-dark-theme text-dark-theme text-center col-12 pt-1 pb-0 px-3 "}>
                        <h3><strong>Enter a Code:</strong></h3>
                    </div>
                    <div className={"card code-entry-card col-12 mt-3 pb-0 text-center"}>
                        <input
                            className={"code-entry-input"}
                            type={"text"}
                            maxLength={5}
                            value={this.state.codeInputValue}
                            key={this.state.codeInputValue}
                            ref={this.inputRef}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={"card btn button-card join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center"}
                    onClick={this.handleJoinClick}>
                        Join
                    </div>
                </div>
            </div>

        )
    }
}

export default JoinForm