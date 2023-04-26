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
import { handleTextPaste } from "../../functions/question-editor/question-answers/handleTextPaste";
import { handleTextBlur } from "../../functions/question-editor/question-answers/handleTextBlur";
import { removeAnswer } from "../../functions/question-editor/question-answers/removeAnswer";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-editor.css"

class AnswerCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const handleRemovalClick = (event) => {
            event.stopPropagation();
            removeAnswer(this.props.answer, this.props.activeQuestion, this.props.setActiveQuestion)
        }

        return (
            <div className={`card card-very-dark m-2 ${this.active ? 'answer-card-active' : 'answer-card'}`}>
                <div className={"card-body center"}>
                    <Checkbox
                        isChecked={this.props.answer.is_correct}
                        handler={(label, state) => handleCheckboxChange(
                            this.props.answer,
                            state,
                            this.props.activeQuestion,
                            this.props.setActiveQuestion,
                        )}
                    />
                    <textarea className="answer-input"
                              placeholder={"Enter an answer..."}
                              value={this.props.answer.text}
                              onChange={(event) => handleTextChange(
                                  event,
                                  this.props.answer,
                                  this.props.activeQuestion,
                                  this.props.setActiveQuestion,
                              )}
                              onPaste={(event) => handleTextPaste(
                                  event,
                                  this.props.answer,
                                  this.props.activeQuestion,
                                  this.props.setActiveQuestion,
                              )}
                              onBlur={(event) => handleTextBlur(
                                  event,
                                  this.props.answer,
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