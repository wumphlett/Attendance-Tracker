/**
 * question-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 17 APR 23
 *
 * Display a question and the available answer choices
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class QuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId
        }
    }

    render() {
        return (
            <div className={"d-flex flex-column h-100 col-12 col-md-8 mx-auto"}>
                <div className={"card question-number-card secondary-dark-theme text-dark-theme p-2 px-3 w-100"}>
                    <h1 className="text-center pb-0 pt-0"><strong>Question 1</strong></h1>
                </div>
                <div className={"card display-card secondary-dark-theme w-100 mt-2"}>
                    <h1>Hello, world!</h1>
                </div>
            </div>
        )
    }
}

export default QuestionDisplay;