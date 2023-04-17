/**
 * question-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Preview of a question displayed in the selector
 */
// Main
import React from "react";
// Functions
import { removeQuestion } from "../../functions/removeQuestion";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-selector.css"

class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions,
            activeQuestion: props.activeQuestion,
            question: props.question,   // Respective question
            index: props.index,         // Position of question in the quiz
            total: props.total,         // Total number of questions in the quiz
        }
        this.setCreatorState = props.setCreatorState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        const handleRemoveClick = (event) => {
            event.stopPropagation();
            removeQuestion(this.state.question, this.state, this.setCreatorState)
        }

        return (
            <div className={`card question-card card-very-dark p-2
                ${(this.state.question === this.state.activeQuestion) ? 'question-card-active' : ''}`}
                onClick={() => { this.setCreatorState({activeQuestion: this.state.question}) }}>
                <div className={"d-inline-block overflow-auto"}>
                    <span className={"badge badge-question-number"}>{this.state.question.id}/{this.state.total}</span>
                    <span className={"btn btn-danger removal-button"}
                          onClick={(event) => handleRemoveClick(event)}>Delete</span>
                    <p style={{ marginTop: '20px' }}>{this.state.question.text}</p>
                </div>
            </div>
        )
    }
}

export default QuestionCard;