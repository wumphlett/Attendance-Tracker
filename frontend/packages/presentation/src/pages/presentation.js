/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Present a quiz
 */
// Main
import React from "react";
// Components
import { Navbar } from "@frontend/common/build"
import CodeDisplay from "./join";
import CounterCard from "../components/counter-card";
// Functions
// Stylesheets
import "../stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            index: 1,
            prompt: "What is the airspeed of an unladen swallow?",
            answers: [
                "Is this some kind of joke?",
                "If it is, I don't find it very funny.",
                "Give me a break.",
                "Fine. 15mph?"
            ]
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
                                <div></div>
                            )}
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation