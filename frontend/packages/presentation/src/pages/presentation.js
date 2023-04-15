/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 13 APR 23
 *
 * Present a quiz
 */
// Main
import React from "react";
// Components
import { Navbar } from "@frontend/common/build"
// Functions
// Stylesheets
import "../stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            prompt: "What is the airspeed of an unladen swallow?",
            answers: [
                "Is this some kind of joke?",
                "If it is, I don't find it very funny.",
                "Give me a break.",
                "Fine. 15mph?"
            ]
        }
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        <div className={"card question-card secondary-dark-theme col-12 col-md-6 h-100 p-2"}>
                            <div className={"d-flex justify-content-center align-self-center"}>
                                <div className={"card primary-dark-theme pt-1 pb-0 px-3 text-center d-inline-block"}>
                                    <h3 className={"text-dark-theme"}><strong>Question {this.state.index}</strong></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation