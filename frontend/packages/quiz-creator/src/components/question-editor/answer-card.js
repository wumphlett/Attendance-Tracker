/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 27 FEB 23
 *
 * Card containing a possible answer to a question and its correctness
 */
// Main
import React from "react";
// Components
import { Checkbox } from "@frontend/common/build"
// Functions
import { handleCheckboxChange } from "../../functions/question-editor/question-answers/handleCheckboxChange";
import { handleTextChange } from "../../functions/question-editor/question-answers/handleTextChange";
import { removeAnswer } from "../../functions/question-editor/question-answers/removeAnswer";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-editor.css"

class AnswerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: props.questions,
                    activeQuestion: props.activeQuestion,
                    activeAnswer: props.activeAnswer }
        this.setQuestions = props.setQuestions
        this.active = false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.questions !== this.props.questions) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
        if(prevProps.activeAnswer !== this.props.activeAnswer) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
    }

    render() {
        const handleRemovalClick = (event) => {
            event.stopPropagation();
            removeAnswer(this.state.activeAnswer, this.state.activeQuestion, this.state.questions, this.setQuestions)
        }

        return (
            <div className={`card card-very-dark my-2 ${this.active ? 'answer-card-active' : 'answer-card'}`}>
                <div className={"card-body center"}>
                    <Checkbox
                        isChecked={this.state.activeQuestion.correctAnswers.includes(this.state.activeAnswer)}
                        handler={(label, state) => handleCheckboxChange(
                            this.state.activeAnswer,
                            state,
                            this.state.activeQuestion,
                            this.state.questions,
                            this.setQuestions
                        )}
                    />
                    <textarea className="answer-input"
                              placeholder={"Enter an answer..."}
                              value={this.state.activeAnswer.text}
                              onFocus={() => {
                                  this.active = true;
                                  this.forceUpdate();
                              }}
                              onBlur={() => {
                                  this.active = false
                                  this.forceUpdate();
                              }}
                              onChange={(event) => handleTextChange(
                                  event,
                                  this.state.activeAnswer,
                                  this.state.activeQuestion,
                                  this.state.questions,
                                  this.setQuestions
                              )}
                    />
                    <span className={"btn btn-danger answer-removal-button"}
                          onClick={(event) => handleRemovalClick(event)}>X</span>
                </div>
            </div>
        )
    }
}

export default AnswerCard;