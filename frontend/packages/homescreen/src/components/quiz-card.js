/**
 * quiz-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Card representing an available quiz
 */
// Main
import React from "react";
// Functions
import { deleteQuiz } from "../functions/deleteQuiz";
import { launchQuiz } from "../functions/launchQuiz";
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

    onLaunchPress = () => {
        console.log(this.state.presentation)
        launchQuiz(this.state.presentation)
    }

    render() {
        return (
            <div className={"card card-body quiz-card secondary-dark-theme mt-2 d-flex flex-row align-items-center"}>
                <div className={"card primary-dark-theme quiz-title-card text-center align-items-center px-2 py-0"}>
                    <h3 className={"quiz-title text-dark-theme"}>{this.state.presentation.name}</h3>
                </div>

                <div className={"quiz-options pb-0"}>
                    <button className={"btn btn-success mb-0 mx-1"} onClick={this.onLaunchPress}>Launch</button>
                    <button className={"btn btn-primary mb-0 mx-1"} onClick={() => {window.location.href = `/create/${this.state.presentation.id}`}}>Edit</button>
                    <button className={"btn btn-danger mb-0 mx-1"} onClick={
                        () => deleteQuiz(this.state.presentation, this.state.presentations, this.setUserState)
                    }>Delete</button>
                </div>
                <div className={"card primary-dark-theme question-count-card px-2 py-2"}>
                    <p className={"m-0 p-0 text-dark-theme"}>{this.state.presentation.question_set.length} Question{this.state.presentation.question_set.length !== 1 ? 's' : ''}</p>
                </div>
            </div>
        )
    }
}

export default QuizCard;