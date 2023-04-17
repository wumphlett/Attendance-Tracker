/**
 * quiz-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 23 MAR 23
 *
 * Card representing an available quiz
 */
// Main
import React from "react";
// Functions
import { deleteQuiz } from "../functions/deleteQuiz";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class QuizCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { presentation: props.presentation, presentations: props.presentations }
        this.setUserState = props.setUserState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return { presentation: nextProps.presentation, presentations: nextProps.presentations }
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className={"card card-body quiz-card primary-dark-theme mt-1 d-flex flex-row justify-content-center"}>
                <h3 className={"text-dark-theme"}>{this.state.presentation.name}</h3>

                <div className={"quiz-options pb-0"}>
                    <button className={"btn btn-success mb-0 mx-1"}>Launch</button>
                    <button className={"btn btn-primary mb-0 mx-1"}>Edit</button>
                    <button className={"btn btn-danger mb-0 mx-1"} onClick={
                        () => deleteQuiz(this.state.presentation, this.state.presentations, this.setUserState)
                    }>Delete</button>
                </div>
                <div className={"card primary-dark-theme question-count-card px-2"}>
                    <p className={"m-0 p-0 text-dark-theme"}>{this.state.presentation.question_set.length} Question{this.state.presentation.question_set.length !== 1 ? 's' : ''}</p>
                </div>
            </div>
        )
    }
}

export default QuizCard;