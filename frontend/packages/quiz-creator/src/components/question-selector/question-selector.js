/**
 * question-selector.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React from "react";
// Functions
import { createQuestion } from "../../functions/createQuestion"
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-selector.css"

class QuestionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: props.questions, activeQuestion: props.activeQuestion }
        this.setQuestions = props.setQuestions;
        this.setActiveQuestion = props.setActiveQuestion;
    }

    render() {
        return (
            <div className={"container-fluid selector h-100 pb-2"}>
                <div className={"card card-dark card-format h-100"}>

                </div>
            </div>
        )
    }
}

export default QuestionSelector
