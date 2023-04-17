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
                        {/* Join Code */}
                        <div className={"h-100 d-flex align-self-center justify-content-center"}>
                            <CodeDisplay />
                        </div>
                        {/* Active Users*/}
                    </div>
                </div>
            </div>
        )
   }
}

export default Presentation