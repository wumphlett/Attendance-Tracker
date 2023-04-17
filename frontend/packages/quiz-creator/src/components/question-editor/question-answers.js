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
        this.setCreatorState = props.setCreatorState;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps.state
        }
    }

    render() {
        this.isAddButtonDisabled = (this.state.activeQuestion.answer_set.length >= 4)

        const AddAnswerButton = () => {
            return (
                <div className={"card btn button-card card-very-dark m-2"}
                    onClick={() => createAnswer(
                        this.state.activeQuestion,
                        this.state.questions,
                        this.setCreatorState
                    )}>
                    <h3>+</h3>
                </div>
            )
        }

        return (
            <div className={"card card-very-dark answer-deck"}>
                <div className="d-inline-block">
                    {this.state.activeQuestion.answer_set.map((answer) => (
                        <AnswerCard
                            questions={this.state.questions}
                            activeQuestion={this.state.activeQuestion}
                            setCreatorState={this.setCreatorState}
                            activeAnswer={answer}
                        />
                    ))}
                    { !this.isAddButtonDisabled && <AddAnswerButton
                        questions={this.state.questions}
                        setCreatorState = {this.setCreatorState}
                    />}
                </div>
            </div>
        )
    }
}

export default QuestionAnswers;