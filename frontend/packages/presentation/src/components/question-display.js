/**
 * question-display.js
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

class QuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.client = props.client
        this.state = {
            sessionId: props.sessionId,
            isLoadingComplete: false,
            activeQuestion: {
                prompt: "",
                answerChoices: [
                    {},
                    {},

                ]
            },
            questionState: "pre-response",
            isAcceptingResponses: false,
            currentlyJoined: props.currentlyJoined
        }
        this.setState = this.setState.bind(this);
        this.onNextClicked = this.onNextClicked.bind(this)
        this.cycleNextQuestion()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentlyJoined !== prevState.currentlyJoined) {
            this.setState({currentlyJoined: nextProps.currentlyJoined})
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

    cycleNextQuestion() {
        axios.post(`sessions/${this.state.sessionId}/next/`)
            .then((res) => {
                this.setActiveQuestion(res.data)
                axios.get(`sessions/${this.state.sessionId}/respond/`)
                    .then((res) => {
                        this.client.send(
                            JSON.stringify(res.data)
                        );
                    });
            })
    }

    cycleQuestionState() {
        if (this.state.questionState === "pre-response") {
            this.setState({ questionState: "response"}, () => {
                this.cycleNextQuestion()
            })

        }
        else if (this.state.questionState === "response") {
            this.setState({ questionState: "post-response", isAcceptingResponses: false})
        }
        else if (this.state.questionState === "post-response") {
            this.setState({ questionState: "pre-response"}, () => {
                this.cycleNextQuestion()
            })
        }
    }

    onNextClicked = (event) => {
        event.preventDefault();
        this.cycleQuestionState()
    }

    render() {
        return (
            <div className={"col-12 col-md-8 h-100 mx-auto"}>
                {!this.state.isLoadingComplete ? (<div></div>) : (
                    <div className={"d-flex flex-column h-100"}>
                        <div className={"card question-number-card secondary-dark-theme text-dark-theme p-2 px-3 w-100"}>
                            <h1 className="text-center pb-0 pt-0"><strong>Question {this.state.activeQuestion.index + 1}</strong></h1>
                        </div>
                        <div className={"card display-card d-flex flex-column secondary-dark-theme w-100 mt-2 p-2 no-gutters"}>
                            <div className={"card primary-dark-theme text-dark-theme d-flex flex-column p-2"} style={{ flex: 0.50}}>
                                <h1><strong>{this.state.activeQuestion.prompt}</strong></h1>
                                <div style={{ marginTop: 'auto'}}>
                                    <ControlCard
                                        recordedResponses={0}
                                        currentlyJoined={this.state.currentlyJoined}
                                        questionState={this.state.questionState}
                                        onNextClicked={this.onNextClicked}
                                    />
                                </div>
                            </div>
                            <div className={"flex-wrap-container mt-2"} style={{ flex: 0.50}}>
                                {this.state.activeQuestion.answerChoices.map((answerChoice, index) => (
                                    <div key={index} className={"flex-wrap-item"}>
                                        <AnswerCard
                                            answer={answerChoice}
                                            questionState={this.state.questionState}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default QuestionDisplay;