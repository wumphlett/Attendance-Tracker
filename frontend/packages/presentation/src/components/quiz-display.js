/**
 * quiz-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 24 APR 23
 *
 * Display a question and the available answer choices
 */
// Main
import React from "react";
import axios from "axios";
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
            sessionId: props.sessionId,
            client: props.client,
            activeQuestion: null,
            isAcceptingResponses: false,
            responseCount: props.responseCount,
            currentlyJoined: props.currentlyJoined,
            quizState: props.quizState,
        }
        this.setResponseCount = props.setResponseCount
        this.setQuizState = props.setQuizState

        this.setState = this.setState.bind(this);
        this.onNextClicked = this.onNextClicked.bind(this)
        if (this.state.activeQuestion === null) {
            this.cycleNextQuestion()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    setActiveQuestion(data) {
        this.setState(  {
            activeQuestion: {
                prompt: data.current_question.text,
                index: data.current_question.index,
                answerChoices: data.current_question.answer_set,
                end_time: data.end_time,
                responseCount: 0
            },
            isAcceptingResponses: data.is_accepting_responses,
            isLoadingComplete: true
        })
    }

    cycleNextQuestion(callback) {
        axios.post(`sessions/${this.state.sessionId}/next/`)
            .then((res) => {
                axios.get(`sessions/${this.state.sessionId}/respond/`)
                    .then((res) => {
                        this.state.client.send(
                            JSON.stringify(res.data)
                        );
                    });
                // Quiz is complete
                if (res.data.current_question === null) {
                    this.setQuizState("completed")
                }
                // If quiz is not complete, update the question
                else {
                    console.log(res.data)
                    this.setActiveQuestion(res.data)
                    if (typeof callback === "function") {
                        // Call the callback function
                        callback();
                    }
                }
            })
    }

    cycleQuizState() {
        if (this.state.quizState === "pre-response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("response")
            })
        }
        else if (this.state.quizState === "response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("post-response")
            })

        }
        else if (this.state.quizState === "post-response") {
            this.cycleNextQuestion(() => {
                this.setQuizState("pre-response")
                this.setResponseCount(0)
            })
        }
    }

    onNextClicked = (event) => {
        event.preventDefault();
        this.cycleQuizState();
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-8 h-100 mx-auto"}>
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