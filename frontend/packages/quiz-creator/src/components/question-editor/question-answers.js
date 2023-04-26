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
    }

    render() {
        this.isAddButtonDisabled = (this.props.activeQuestion.answer_set.length >= 4)

        const AddAnswerButton = () => {
            return (
                <div className={"card btn button-card card-very-dark m-2"}
                    onClick={() => createAnswer(
                        this.props.activeQuestion,
                        this.props.setActiveQuestion
                    )}>
                    <h3>+</h3>
                </div>
            )
        }

        return (
            <div className={"card card-very-dark answer-deck"}>
                <div className="d-inline-block">
                    {this.props.activeQuestion.answer_set.map((answer, index) => (
                        <AnswerCard
                            activeQuestion={this.props.activeQuestion}
                            setActiveQuestion={this.props.setActiveQuestion}
                            answer={answer}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerButton
                        activeQuestion={this.props.activeQuestion}
                        setActiveQuestion={this.props.setActiveQuestion}
                    />}
                </div>
            </div>
        )
    }
}

export default QuestionAnswers;