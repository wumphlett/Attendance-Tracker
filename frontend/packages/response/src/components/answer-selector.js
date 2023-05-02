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
            answersSelected: props.answersSelected,
            isAnswerSubmitted: props.isAnswerSubmitted
        }
        this.setAnswersSelected = props.setAnswersSelected
        this.submitAnswers = props.submitAnswers
        this.selectAnswer = this.selectAnswer.bind(this)
        this.deselectAnswer = this.deselectAnswer.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    selectAnswer = (answer) => {
        let modifiedAnswers
        if (this.state.activeQuestion.isMultipleSelectionAllowed) {
            modifiedAnswers = ([...this.state.answersSelected, answer])
        } else {
            modifiedAnswers = [answer]
        }
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
                    <div className={"h-100 w-100"}>
                        <div className={"flex-wrap-container w-100"} style={{ height: "calc(100% - 60px - 1rem"}}>
                            {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                                <div key={index} className={"flex-wrap-item"}>
                                    <AnswerCard
                                        index={index}
                                        answer={answerChoice}
                                        quizState={this.state.quizState}
                                        selectAnswer={this.selectAnswer}
                                        deselectAnswer={this.deselectAnswer}
                                        answersSelected={this.state.answersSelected}
                                        isAnswerSubmitted={this.state.isAnswerSubmitted}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className="card btn button-card primary-dark-theme text-dark-theme col-12 col-md-9 col-lg-6 mt-3 mb-1 mx-auto"
                             style={{ height: "60px" }} onClick={this.submitAnswers} disabled={this.state.isAnswerSubmitted || this.state.answersSelected.length === 0 || this.state.quizState === "post-response"}>
                            <h3><strong>Submit</strong></h3>
                        </button>
                    </div>
                ) : (
                    <div className={"text-dark-theme d-flex justify-content-center align-items-center h-100 w-100"}>
                        <h3 style={{ color: "floralwhite "}}><strong>Get Ready...</strong></h3>
                    </div>
                )}
            </div>
        )
    }
}

export default AnswerSelector