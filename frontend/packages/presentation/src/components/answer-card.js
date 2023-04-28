/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
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
            index: props.index,
            answer: props.answer,
            quizState: props.quizState,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        return (
            <div className={`card primary-dark-theme d-flex flex-row align-items-center text-dark-theme user-select-none p-2 h-100
                ${this.state.quizState === "post-response" && this.state.answer.is_correct ? 'correct' :
                this.state.quizState === "post-response" && !this.state.answer.is_correct ? 'incorrect' : 
                    'answer-card'}`}>
                <h1 className={"pb-2"} style={{ fontSize: "5vh", paddingTop: 0 }}><strong>{this.state.index + 1})</strong></h1>
                <div className={"ms-3 answer-div"}>
                    <h2><strong>{this.state.answer.text}</strong></h2>
                </div>
            </div>
        )
    }
}

export default AnswerCard;