/**
 * question-options.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 22 FEB 23
 *
 * Various options for quiz questions, including time limit and answer options
 */
// Main
import React from 'react'
// Components
import Checkbox from '../global/checkbox'
import AnswerCard from '../quiz-creation/answer-card'
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

// Available answers
class QuestionAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.questions = props.questions;
        this.setQuestions = props.setQuestions;
        this.activeQuestion = props.activeQuestion;
    }

    render () {
        this.isAddButtonDisabled = (this.activeQuestion.potentialAnswers.length >= 4)

        const AddAnswerCard = () => {
            return (
                <div className="card card-body question-card card-very-dark button-card btn btn-danger my-2"
                     onClick={addAnswer}>
                    <h3>+</h3>
                </div>
            )
        }

        const handleRemoveClick = (event, answer) => {
            event.stopPropagation();
            removeAnswer(answer)
        }

        const handleCheckboxChange = (label, state) => {

        }

        const addAnswer = () => {
            let modifiedQuestion = this.activeQuestion;
            let answer = {
                id: Math.random().toString(36).substring(2) + Date.now().toString(36),
                text: "",
                isCorrect: true
            }
            modifiedQuestion.potentialAnswers.push(answer);
            modifyQuestion(this.questions, this.setQuestions, modifiedQuestion);
        }

        const removeAnswer = (answerToRemove) => {
            let modifiedQuestion = this.activeQuestion;
            modifiedQuestion.potentialAnswers =
                modifiedQuestion.potentialAnswers.filter(answer => answer !== answerToRemove)
            modifyQuestion(this.questions, this.setQuestions, modifiedQuestion);
        }

        const modifyQuestion = (questions, setQuestions, modifiedQuestion) => {
            let newQuestions = [...questions];
            const index = newQuestions.findIndex((question) => question.id === modifiedQuestion.id);
            newQuestions[index] = modifiedQuestion;
            setQuestions(newQuestions);
        }

        return (
            <div className="card card-very-dark" style={{ flex: 1 }}>
                <div className="d-inline-block overflow-auto p-2">
                    {this.activeQuestion.potentialAnswers.map((potentialAnswer, index) => (
                        <AnswerCard
                            questions={this.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.activeQuestion}
                            activeAnswer={potentialAnswer}
                            index={index}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerCard
                        questions={this.questions}
                        setQuestions={this.setQuestions}
                        activeQuestion={this.activeQuestion}
                    /> }
                </div>
            </div>
        )
    }
}

class QuestionOptions extends React.Component {
    constructor(props) {
        super(props);
        this.testText = props.testText;
        this.questions = props.questions;
        this.setQuestions = props.setQuestions;
        this.activeQuestion = props.activeQuestion;
    };

    render() {
        // Header card
        const HeaderCard = (props) => {
            return (
                <div className="card card-very-dark mb-2"> {/* Question Number */}
                    <div className="card-body">
                        <h3 className="text-center"><strong>{props.text}</strong></h3>
                    </div>
                </div>
            )
        };

        // Container card
        return (
            <div className="container-fluid h-100 p-2">
                <div className="card card-dark card-format">
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <HeaderCard text={"Options"}/>
                        <QuestionSettings
                            questions={this.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.activeQuestion}
                        />
                        <HeaderCard text={"Answers"}/>
                        <QuestionAnswers
                            questions={this.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.activeQuestion}
                        />
                    </div>
                </div>
            </div>
        )
    };
}


export default QuestionOptions;