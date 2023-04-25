/**
 * response.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Respond to a quiz
 */
// Main
import React from "react";
import axios from "axios";
// Components
import { Navbar } from "@frontend/common/build"
import JoinForm from "./join";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            client: null,
            activeQuestion: null,
            quizState: "loading",
            isAcceptingResponses: false,
            endTime: null
        }
        this.setSessionId = this.setSessionId.bind(this);
        this.setClient = this.setClient.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.addClientHandlers = this.addClientHandlers.bind(this);
        this.setActiveQuestion = this.setActiveQuestion.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId });
    }

    setClient = (client, callback) => {
        this.setState({ client: client }, () => {
            callback();
        });
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
    }

    addClientHandlers = (client, setActiveQuestion) => {
        client.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if (data) {
                setActiveQuestion(data)
            }
        }
    }

    setActiveQuestion = (data) => {
        this.setState({
            sessionId: data.id,
            activeQuestion: data.current_question,
            isAcceptingResponses: data.isAcceptingResponses,
            endTime: data.end_time
        }, () => {
            console.log(this.state.activeQuestion)
        })
    }

    render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                            <JoinForm
                                client={this.state.client}
                                setClient={this.setClient}
                                addClientHandlers={this.addClientHandlers}
                                setActiveQuestion={this.setActiveQuestion}
                            />
                        ) : this.state.quizState !== "completed" ? (
                            <div>

                            </div>
                        ) : (
                            <div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;

