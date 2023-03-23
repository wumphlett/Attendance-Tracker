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
            question: props.question,   // Respective question
            questions: props.questions,
            activeQuestion: props.activeQuestion,
            index: props.index,         // Position of question in the quiz
            total: props.total,         // Total number of questions in the quiz
        }
        this.setQuestions = props.setQuestions
        this.setActiveQuestion = props.setActiveQuestion
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.total !== prevState.total) {
            return nextProps
        }
        if (nextProps.questions !== prevState.questions) {
            return nextProps
        }
        if (nextProps.activeQuestion !== prevState.activeQuestion) {
            return nextProps
        }
        if (nextProps.index !== prevState.index) {
            return nextProps
        }
    }

    render() {
        const handleRemoveClick = (event) => {
            event.stopPropagation();
            removeQuestion(this.state.question, this.state.activeQuestion, this.setActiveQuestion, this.state.questions, this.setQuestions)
        }

        return (
            <div className={`card question-card card-very-dark p-2
                ${(this.state.question === this.state.activeQuestion) ? 'question-card-active' : ''}`}
                onClick={() => { this.setActiveQuestion(this.state.question) }}>
                <div className={"d-inline-block overflow-auto"}>
                    <span className={"badge badge-question-number"}>{this.state.index}/{this.state.total}</span>
                    <span className={"btn btn-danger removal-button"}
                          onClick={(event) => handleRemoveClick(event)}>X</span>
                    <p style={{ marginTop: '20px' }}>{this.state.question.prompt}</p>
                </div>
            </div>
        )
    }
}

export default QuestionCard;