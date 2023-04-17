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
        this.state = {
          questions: props.questions,
          activeQuestion: props.activeQuestion,
          activeAnswer: props.activeAnswer
        }
        this.setCreatorState = props.setCreatorState
        this.active = false
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps
        }
    }

    render() {
        const handleRemovalClick = (event) => {
            event.stopPropagation();
            removeAnswer(this.state.activeAnswer, this.state.activeQuestion, this.state.questions, this.setCreatorState)
        }

        return (
            <div className={`card card-very-dark m-2 ${this.active ? 'answer-card-active' : 'answer-card'}`}>
                <div className={"card-body center"}>
                    <Checkbox
                        isChecked={this.state.activeAnswer.is_correct}
                        handler={(label, state) => handleCheckboxChange(
                            this.state.activeAnswer,
                            state,
                            this.state.activeQuestion,
                            this.state.questions,
                            this.setCreatorState
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
                                  this.setCreatorState
                              )}
                    />
                    <span className={"btn btn-danger answer-removal-button"}
                          onClick={(event) => handleRemovalClick(event)}>Delete</span>
                </div>
            </div>
        )
    }
}

export default AnswerCard;