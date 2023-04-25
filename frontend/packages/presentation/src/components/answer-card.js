/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 24 APR 23
 *
 * Display an answer choice
 */
// Main
import React from "react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class AnswerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: props.answer,
            questionState: props.questionState,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        return (
            <div className={`card primary-dark-theme text-dark-theme p-2 h-100 overflow-auto
                ${this.state.questionState === "post-response" && this.state.answer.is_correct ? 'correct' :
                this.state.questionState === "post-response" && !this.state.answer.is_correct ? 'incorrect' : 
                    'answer-card'}`}>
                <h2><strong>{this.state.answer.text}</strong></h2>
            </div>
        )
    }
}

export default AnswerCard;