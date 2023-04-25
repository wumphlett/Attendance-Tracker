/**
 * answer-selector.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Select an answer in response
 */
// Main
import React from "react";
// Components
import AnswerCard from "./answer-card";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class AnswerSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizState: props.quizState,
            activeQuestion: props.activeQuestion,
            answersSelected: props.answersSelected
        }
        this.setAnswersSelected = props.setAnswersSelected
        this.selectAnswer = this.selectAnswer.bind(this)
        this.deselectAnswer = this.deselectAnswer.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    selectAnswer = (answer) => {
        let modifiedAnswers = ([...this.state.answersSelected, answer])
        this.setAnswersSelected(modifiedAnswers);
    }

    deselectAnswer = (answerToRemove) => {
        let modifiedAnswers = this.state.answersSelected.filter((answer) => answer.id !== answerToRemove.id)
        this.setAnswersSelected(modifiedAnswers)
    }

    render() {
        return (
            <div className={"h-100 w-100"}>
                {this.state.quizState === "response" || this.state.quizState === "post-response" ? (
                    <div className={"flex-wrap-container h-100 w-100"}>
                        {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                            <div key={index} className={"flex-wrap-item"}>
                                <AnswerCard
                                    answer={answerChoice}
                                    selectAnswer={this.selectAnswer}
                                    deselectAnswer={this.deselectAnswer}
                                />
                            </div>
                        ))}
                    </div>
                ) : (<div></div>) }
            </div>
        )
    }
}

export default AnswerSelector