/**
 * question-answers.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Available answer choices for a given question
 */
// Main
import React from "react";
// Components
import AnswerCard from "./answer-card";
// Functions
import { createAnswer } from "../../functions/question-editor/question-answers/createAnswer";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-options.css"

class QuestionAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.setQuestions = props.setQuestions;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.state.activeQuestion !== this.props.state.activeQuestion) {
            this.setState({ activeQuestion: this.props.state.activeQuestion,
                questions: this.props.state.questions })
        }
        if (prevProps.state.questions !== this.props.state.questions) {
            this.setState({ activeQuestion: this.props.state.activeQuestion,
                questions: this.props.state.questions })
        }
    }

    render() {
        this.isAddButtonDisabled = (this.state.activeQuestion.potentialAnswers.length >= 4)

        const AddAnswerButton = () => {
            return (
                <div className={"card btn button-card card-very-dark m-2"}
                    onClick={() => createAnswer(
                        this.state.activeQuestion,
                        this.state.questions,
                        this.setQuestions
                    )}>
                    <h3>+</h3>
                </div>
            )
        }

        return (
            <div className={"card card-very-dark answer-deck"}>
                <div className="d-inline-block">
                    {this.state.activeQuestion.potentialAnswers.map((potentialAnswer, index) => (
                        <AnswerCard
                            questions={this.state.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.state.activeQuestion}
                            activeAnswer={potentialAnswer}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerButton
                        questions={this.state.questions}
                        setQuestiosn = {this.setQuestions}
                    />}
                </div>
            </div>
        )
    }
}

export default QuestionAnswers;