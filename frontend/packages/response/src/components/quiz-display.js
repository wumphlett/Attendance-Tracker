/**
 * quiz-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Display a question and the available answer choices
 */
// Main
import React from "react";
import axios from "axios";
// Components
import AnswerSelector from "./answer-selector";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class QuizDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            activeQuestion: props.activeQuestion,
            quizState: props.quizState,
            isAcceptingResponses: props.isAcceptingResponses,
            answersSelected: [],
            isAnswerSubmitted: false,
        }
        this.postAnswers = props.postAnswers
        this.setAnswersSelected = this.setAnswersSelected.bind(this)
        this.submitAnswers = this.submitAnswers.bind(this)
        this.resetSelection = this.resetSelection.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.quizState === "pre-response" && prevState.quizState === "post-response") {
            this.resetSelection();
        }
    }

    resetSelection = () => {
        this.setState({ answersSelected: [], isAnswerSubmitted: false })
    }

    setAnswersSelected = (answers) => {
        this.setState( { answersSelected: answers })
    }

    submitAnswers = () => {
        this.postAnswers(this.state.answersSelected)
        this.setState({ isAnswerSubmitted: true })
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-8 h-100 py-2 mx-auto"}>
                    {this.state.activeQuestion === null ? (<div></div>) : (
                        <div className={"card display-card d-flex flex-column secondary-dark-theme h-100 w-100 p-2 no-gutters"}>
                            <AnswerSelector
                                quizState={this.state.quizState}
                                activeQuestion={this.state.activeQuestion}
                                answersSelected={this.state.answersSelected}
                                setAnswersSelected={this.setAnswersSelected}
                                isAnswerSubmitted={this.state.isAnswerSubmitted}
                                submitAnswers={this.submitAnswers}
                            />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default QuizDisplay