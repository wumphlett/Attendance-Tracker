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
        this.setQuestions = props.setQuestions
        this.state = { questions: props.questions, activeQuestion: props.activeQuestion }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion });
        }
        if(prevProps.questions !== this.props.questions) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion });
        }
    }

    render() {
        const handleCheckboxChange = (label, state) => {
            if (label === "Enforce time limit") {
                let modifiedQuestion = this.state.activeQuestion
                modifiedQuestion.isTimeLimited = state
                modifyQuestion(this.state.questions, this.setQuestions, modifiedQuestion)
            }
            else if (label === "Allow partial credit") {
                let modifiedQuestion = this.state.activeQuestion
                modifiedQuestion.isPartialCreditAllowed = state
                modifyQuestion(this.state.questions, this.setQuestions, modifiedQuestion)
            }
            else if (label === "Allow multiple selection") {
                let modifiedQuestion = this.state.activeQuestion
                modifiedQuestion.isMultipleSelectionAllowed = state
                modifyQuestion(this.state.questions, this.setQuestions, modifiedQuestion)
            }
        }

        const modifyQuestion = (modifiedQuestion) => {
            let newQuestions = [...this.state.questions];
            const index = newQuestions.findIndex((question) => question.id === modifiedQuestion.id);
            newQuestions[index] = modifiedQuestion;
            this.setQuestions(newQuestions);
        }

        return (
            <div className="card card-very-dark mb-2">
                <div className="card-body">
                    <Checkbox label={"Enforce time limit"}
                              isChecked={this.state.activeQuestion.isTimeLimited}
                              handler={handleCheckboxChange} />
                    <Checkbox label={"Allow partial credit"}
                              isChecked={this.state.activeQuestion.isPartialCreditAllowed}
                              handler={handleCheckboxChange} />
                    <Checkbox label={"Allow multiple selection"}
                              isChecked={this.state.activeQuestion.isMultipleSelectionAllowed}
                              handler={handleCheckboxChange} />
                </div>
            </div>
        )
    }
}

export default QuestionSettings;