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
import AnswerCard from "./answer-card";
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
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-8 h-100 py-2 mx-auto"}>
                    {this.state.activeQuestion === null ? (<div></div>) : (
                        <div className={"card display-card d-flex flex-column secondary-dark-theme h-100 w-100 p-2 no-gutters"}>
                            <div className={"flex-wrap-container"} style={{ height: "100%" }}>
                                {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                                    <div key={index} className={"flex-wrap-item"}>
                                        <AnswerCard
                                            answer={answerChoice}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default QuizDisplay