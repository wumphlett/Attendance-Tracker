/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 3 APR 23
 *
 * Run a presentation
 */
// Main
import React from "react";
import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

// Functions
// Components
import { Navbar } from "@frontend/common/build";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "./stylesheets/main.css"
import "./stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joinCode: "",
            sessionId: null,
            question: null,
            isAcceptingResponses: false,
            endTime: null,
            responseCount: 0,
        }

        if(localStorage.getItem('access_token') === null){
            window.location.href = '/presentation/login'
        }
    }

    render() {
        const onJoinClicked = (event) => {
            event.preventDefault();
            axios.get('http://127.0.0.1:8000/api/sessions/join/', {params: {token: this.state.joinCode}})
                .then((r) => {
                    let sessionId = r.data.url;
                    this.client = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + this.state.joinCode + "/?presenter");
                    this.addClientHandlers();
                    axios.get(sessionId)
                        .then((r) => {
                            this.updateSlide(r.data);
                        });
                });
        };

        return(
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content d-flex flex-column"}>
                    {this.state.sessionId ? (
                        <div>

                        </div>
                    ) : (
                        <div className={"d-flex justify-content-center align-items-center"} style={{ flex: 1 }}>
                            <div className={"h-auto"}>
                                <div className={"card secondary-dark-theme join-card"}>
                                    <form className={"join-form"} onSubmit={(event) => onJoinClicked(event)}>
                                        <div className="join-form-content">
                                            <h4 className={"join-form-title text-white"}>Join Session</h4>
                                            <input
                                                className="join-form-input"
                                                onChange={(event) => {
                                                    this.setState({ joinCode: event.target.value.toUpperCase() });
                                                }}
                                            />
                                            <button className="btn btn-orange" type={"submit"}>
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Presentation