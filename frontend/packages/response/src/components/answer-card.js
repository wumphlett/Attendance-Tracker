/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Display an answer choice
 */
// Main
import React from "react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class AnswerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: props.answer,
            quizState: props.quizState,
            answerSelected: false
        }
        this.selectAnswer = props.selectAnswer
        this.deselectAnswer = props.deselectAnswer
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    handleButtonPress = (event) => {
        event.stopPropagation();
        if (!this.state.answerSelected) {
            this.setState({ answerSelected: true })
            this.selectAnswer(this.state.answer)
        }
        else if (this.state.answerSelected) {
            this.setState({ answerSelected: false })
            this.deselectAnswer(this.state.answer)
        }
    }

    render() {
        return (
            <div className={`card primary-dark-theme text-dark-theme p-2 h-100 overflow-auto text-center btn answer-button${this.state.answerSelected ? " selected" : ""}`}
            onClick={this.handleButtonPress}>
                <text className={"pt-0"}>{this.state.answer.symbol}</text>
            </div>
        )
    }
}

export default AnswerCard;