/**
 * quiz-list.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * List all available quizzes
 */
// Main
import React from "react";
// Components
import QuizCard from "./quiz-card";
// Functions
import { createQuiz } from "../functions/createQuiz";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class QuizList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presentations: props.presentations,
        }
        this.setUserState = props.setUserState
        this.setActivePresentation = props.setActivePresentation
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return { presentations: nextProps.presentations }
        }
    }

    render() {

        const CreateQuizButton = () => {
            return (
                <div className={"card card-body secondary-dark-theme button-card btn mt-2 text-white"}
                    onClick={() => {
                        createQuiz(
                            this.state.presentations,
                            this.setUserState
                        )
                    }}>
                    <h1>+</h1>
                </div>
            )
        }

        return (
            <div className={"card secondary-dark-theme p-2 d-flex flex-column overflow-auto"} style={{ flex: 1 }}>
                <div className={"d-flex justify-content-center align-self-center"}>
                    <div className={"card primary-dark-theme pt-1 pb-0 px-3 text-center d-inline-block"}>
                        <h3 className={"text-dark-theme user-select-none"}><strong>Presentations</strong></h3>
                    </div>
                </div>
                <div className={"d-flex flex-column overflow-auto"} style={{ flex: 1 }}>
                    <div className={"card primary-dark-theme d-flex flex-column mt-2 overflow-auto"} style={{ flex: 1 }}>
                        <div className={"container-fluid quiz-list overflow-auto p-2"}>
                            <div className={"d-inline-block pe-2"}>
                                {this.state.presentations.map((presentation, index) => (
                                    <div key={index}>
                                        <QuizCard
                                            presentation={presentation}
                                            presentations={this.state.presentations}
                                            setUserState={this.setUserState}
                                            setActivePresentation={this.setActivePresentation}
                                        />
                                    </div>
                                ))}
                                <CreateQuizButton />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default QuizList;