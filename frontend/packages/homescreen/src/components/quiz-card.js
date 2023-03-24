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
        this.state = { quiz: props.quiz, quizzes: props.quizzes }
        this.setUserState = props.setUserState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return { quiz: nextProps.quiz, quizzes: nextProps.quizzes }
        }
    }

    render() {

        return (
            <div className={"card card-body quiz-card primary-dark-theme mt-1 d-flex flex-row justify-content-center"}>
                <h3>{this.state.quiz.title}</h3>

                <div className={"quiz-options pb-0"}>
                    <button className={"btn btn-success mb-0 mx-1"}>Launch</button>
                    <button className={"btn btn-primary mb-0 mx-1"}>Edit</button>
                    <button className={"btn btn-danger mb-0 mx-1"} onClick={
                        () => deleteQuiz(this.state.quiz, this.state.quizzes, this.setUserState)
                    }>Delete</button>
                </div>
                <div className={"card primary-dark-theme question-count-card px-2"}>
                    <p className={"m-0 p-0"}>{this.state.quiz.questions.length} Questions</p>
                </div>
            </div>
        )
    }
}

export default QuizCard;