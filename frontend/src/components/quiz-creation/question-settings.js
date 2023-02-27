/**
 * question-settings.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 26 FEB 23
 *
 * Various options for quiz questions, including time limit and answer options
 */
// Main
import React from 'react'
// Components
import Checkbox from '../global/checkbox'
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/quiz-editor.css'
import '../../stylesheets/quiz-creation/answer-creation.css'

// Settings for the question
class QuestionSettings extends React.Component {
    constructor(props) {
        super(props);
        this.questions = props.questions
        this.setQuestions = props.setQuestions
        this.activeQuestion = props.activeQuestion
    }

    render() {
        const handleCheckboxChange = (label, state) => {
            if (label === "Enforce time limit") {
                let modifiedQuestion = this.activeQuestion
                modifiedQuestion.isTimeLimited = state
                modifyQuestion(this.questions, this.setQuestions, modifiedQuestion)
            }
            else if (label === "Allow partial credit") {
                let modifiedQuestion = this.activeQuestion
                modifiedQuestion.allowPartialCredit = state
                modifyQuestion(this.questions, this.setQuestions, modifiedQuestion)
            }
        }

        const modifyQuestion = (questions, setQuestions, modifiedQuestion) => {
            let newQuestions = [...questions];
            const index = newQuestions.findIndex((question) => question.id === modifiedQuestion.id);
            newQuestions[index] = modifiedQuestion;
            setQuestions(newQuestions);
        }

        return (
            <div className="card card-very-dark mb-2">
                <div className="card-body">
                    <Checkbox label={"Enforce time limit"} default={false} handler={handleCheckboxChange} />
                    <Checkbox label={"Allow partial credit"} default={false} handler={handleCheckboxChange} />
                    <Checkbox label={"Allow multiple selection"} default={false} handler={handleCheckboxChange} />
                </div>
            </div>
        )
    }
}

export default QuestionSettings;