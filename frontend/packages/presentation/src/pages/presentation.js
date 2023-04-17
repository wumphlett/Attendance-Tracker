/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 17 APR 23
 *
 * Present a quiz
 */
// Main
import React from "react";
// Components
import { Navbar } from "@frontend/common/build"
import CodeDisplay from "./join";
import CounterCard from "../components/counter-card";
import QuestionDisplay from "../components/question-display";
// Functions
// Stylesheets
import "../stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
        }
        this.setSessionId = this.setSessionId.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId });
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                                // Join Code
                                <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                                    <CodeDisplay
                                        sessionId={this.state.sessionId}
                                        setSessionId={this.setSessionId}
                                    />
                                    {/* Active Users */}
                                    <CounterCard
                                        currentlyJoined={0}
                                    />
                                </div>
                            ) : (
                                <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                                    <QuestionDisplay
                                        sessionId={this.state.sessionId}
                                    />
                                </div>
                            )}
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation