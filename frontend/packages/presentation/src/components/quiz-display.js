/**
 * quiz-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Display a question and the available answer choices
 */
// Main
import React from "react";
// Components
import AnswerCard from "../components/answer-card"
import ControlCard from "./control-card";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class QuizDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuestion: props.activeQuestion,
            isAcceptingResponses: false,
            responseCount: props.responseCount,
            currentlyJoined: props.currentlyJoined,
            quizState: props.quizState,
        }
        this.joinCode = props.joinCode
        this.setResponseCount = props.setResponseCount
        this.setQuizState = props.setQuizState
        this.cycleQuizState = props.cycleQuizState

        this.onNextClicked = this.onNextClicked.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    onNextClicked = (event) => {
        event.preventDefault();
        this.cycleQuizState();
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-10 col-lg-8 h-100 mx-auto"}>
                    {this.state.activeQuestion === null ? (<div></div>) : (
                        <div className={"d-flex flex-column h-100"}>
                            <div className={"card question-number-card secondary-dark-theme text-dark-theme p-2 px-3 w-100"}>
                                <h1 className="text-center pb-0 pt-0"><strong>Question {this.state.activeQuestion.index + 1}</strong></h1>
                            </div>
                            <div className={"card display-card d-flex flex-column secondary-dark-theme w-100 mt-2 p-2 no-gutters"}>
                                <div className={"card primary-dark-theme text-dark-theme d-flex flex-column p-2"} style={{ flex: 0.50}}>
                                    <h1><strong>{this.state.activeQuestion.prompt}</strong></h1>
                                    <div style={{ marginTop: 'auto'}}>
                                        <ControlCard
                                            joinCode={this.joinCode}
                                            responseCount={this.state.responseCount}
                                            currentlyJoined={this.state.currentlyJoined}
                                            quizState={this.state.quizState}
                                            onNextClicked={this.onNextClicked}
                                        />
                                    </div>
                                </div>
                                <div className={"flex-wrap-container mt-2"} style={{ flex: 0.50}}>
                                    {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                                        <div key={index} className={"flex-wrap-item"}>
                                            <AnswerCard
                                                index={index}
                                                answer={answerChoice}
                                                quizState={this.state.quizState}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default QuizDisplay;