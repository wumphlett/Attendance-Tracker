/**
 * question-answers.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 27 FEB 23
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
        this.setQuestions = props.setQuestions;
        this.setActiveQuestion = props.setActiveQuestion
        this.state = { activeQuestion: props.activeQuestion, questions: props.questions }
        console.log(this.state.questions)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
            console.log("detected")
        }
        if(prevProps.questions !== this.props.questions) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
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
            modifyQuestion(this.state.questions, this.setQuestions, modifiedQuestion);
        }

        const removeAnswer = (answerToRemove) => {
            let modifiedQuestion = this.state.activeQuestion;
            modifiedQuestion.potentialAnswers =
                modifiedQuestion.potentialAnswers.filter(answer => answer !== answerToRemove)
            modifyQuestion(modifiedQuestion);
        }

        const modifyQuestion = (setQuestions, modifiedQuestion) => {
            let newQuestions = [...this.state.questions];
            const index = newQuestions.findIndex((question) => question.id === modifiedQuestion.id);
            newQuestions[index] = modifiedQuestion;
            this.setQuestions(newQuestions);
        }

        return (
            <div className="card card-very-dark" style={{ flex: 1 }}>
                <div className="d-inline-block overflow-auto p-2">
                    {this.state.activeQuestion.potentialAnswers.map((potentialAnswer, index) => (
                        <AnswerCard
                            questions={this.state.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.state.activeQuestion}
                            setActiveQuestion={this.setActiveQuestion}
                            activeAnswer={potentialAnswer}
                            key={potentialAnswer.id}
                            id={potentialAnswer.id}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerCard
                        questions={this.state.questions}
                        setQuestions={this.setQuestions}
                        activeQuestion={this.state.activeQuestion}
                    /> }
                </div>
            </div>
        )
    }
}

export default QuestionAnswers