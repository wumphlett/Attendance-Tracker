/**
 * question-answers.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 26 FEB 23
 *
 * Possible answers for a question and their correctness
 */
// Main
import React from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/quiz-editor.css'
import '../../stylesheets/quiz-creation/answer-creation.css'
import AnswerCard from "./answer-card";

class QuestionAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.questions = props.questions;
        this.setQuestions = props.setQuestions;
        this.state = { activeQuestion: props.activeQuestion }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion});
            console.log(this.state.activeQuestion)
        }
    }

    render () {
        this.isAddButtonDisabled = (this.state.activeQuestion.potentialAnswers.length >= 4)

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
            let modifiedQuestion = this.state.activeQuestion;
            let answer = {
                id: Math.random().toString(36).substring(2) + Date.now().toString(36),
                text: "",
                isCorrect: true
            }
            modifiedQuestion.potentialAnswers.push(answer);
            modifyQuestion(this.questions, this.setQuestions, modifiedQuestion);
            console.log(this.questions)
        }

        const removeAnswer = (answerToRemove) => {
            let modifiedQuestion = this.state.activeQuestion;
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
                    {this.state.activeQuestion.potentialAnswers.map((potentialAnswer, index) => (
                        <AnswerCard
                            questions={this.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.state.activeQuestion}
                            activeAnswer={potentialAnswer}
                            key={potentialAnswer.id}
                            id={potentialAnswer.id}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerCard
                        questions={this.questions}
                        setQuestions={this.setQuestions}
                        activeQuestion={this.state.activeQuestion}
                    /> }
                </div>
            </div>
        )
    }
}

export default QuestionAnswers