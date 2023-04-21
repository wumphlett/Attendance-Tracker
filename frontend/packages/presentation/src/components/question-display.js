/**
 * question-display.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 17 APR 23
 *
 * Display a question and the available answer choices
 */
// Main
import React from "react";
import axios from "axios";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class QuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: props.sessionId,
            activeQuestion: {
                prompt: "This is a prompt.",
                index: 0,
                answerChoices: [
                    "",
                    "",
                    "",
                    "",
                ]
            }
        }
        this.setState = this.setState.bind(this);
    }

    setActiveQuestion(data) {
        console.log(data)
        // this.setState({ activeQuestion: {
        //     prompt: question.prompt,
        //         index: question.index,
        //         answerChoices: question.answerChoices
        // }})
    }

    cycleNextQuestion() {
        axios.post(`${this.state.sessionId}/next/`)
            .then((res) => {
                this.setActiveQuestion(res.data)
                axios.get(`${this.state.sessionId}/respond/`)
                    .then((res) => {
                        this.client.send(
                            JSON.stringify(res.data)
                        );
                    });
            })
    }

    onNextClicked = (event) => {
        event.preventDefault();
        this.cycleNextQuestion();
    }

    render() {
        return (
            <div className={"d-flex flex-column h-100 col-12 col-md-8 mx-auto"}>
                <div className={"card question-number-card secondary-dark-theme text-dark-theme p-2 px-3 w-100"}>
                    <h1 className="text-center pb-0 pt-0"><strong>{this.state.activeQuestion.index}</strong></h1>
                </div>
                <div className={"card display-card d-flex flex-column secondary-dark-theme w-100 mt-2 p-2"}>
                    <div className={"card primary-dark-theme text-dark-theme p-2"} style={{ flex: 0.50}}>
                        <h1><strong>{this.state.activeQuestion.prompt}</strong></h1>
                    </div>
                    <div className={"d-flex bg-black flex-column mt-2"} style={{ flex: 0.40 }}> {/* Answers */}
                        {/*<div className={"pb-1"} style={{ flex: 0.50 }}>*/}
                        {/*    <div className={"d-flex h-100"}>*/}
                        {/*        <div className={"pe-1 h-100"} style={{ flex: 0.50 }}>*/}
                        {/*            <div className={"bg-white h-100"}></div>*/}
                        {/*        </div>*/}
                        {/*        <div className={"ps-1 h-100"} style={{ flex: 0.50 }}>*/}
                        {/*            <div className={"bg-danger h-100"}></div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"pt-1"} style={{ flex: 0.50 }}>*/}
                        {/*    <div className={"d-flex h-100"}>*/}
                        {/*        <div className={"pe-1 h-100"} style={{ flex: 0.50 }}>*/}
                        {/*            <div className={"bg-danger h-100"}></div>*/}
                        {/*        </div>*/}
                        {/*        <div className={"ps-1 h-100"} style={{ flex: 0.50 }}>*/}
                        {/*            <div className={"bg-white h-100"}></div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className={"d-flex bg-black mt-2"} style={{ flex: 0.10 }}>
                        <div className={"col-6 pe-1"}>
                            <div className="card btn button-card stop join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center">
                                Stop
                            </div>
                        </div>
                        <div className={"col-6 ps-1"}>
                            <div className="card btn button-card next join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center"
                                 onClick={this.onNextClicked}>
                                Next
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionDisplay;