/**
 * question-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Preview of a question displayed in the selector
 */
// Main
import React from "react";
// Functions
import {removeQuestion} from "../../functions/removeQuestion";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-selector.css"

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleRemoveClick = (event) => {
      event.stopPropagation();
      removeQuestion(this.props.question, this.props.activeQuestion, this.props.setActiveQuestion, this.props.questions, this.props.setQuestions)
    }

    return (
      <div className={`card question-card card-very-dark p-2
                ${(this.props.question === this.props.activeQuestion) ? 'question-card-active' : ''}`}
           onClick={() => {
             this.props.setActiveQuestion(this.props.question)
           }}>
        <div className={"d-inline-block overflow-auto"}>
          <span className={"badge badge-question-number"}>{this.props.index}/{this.props.total}</span>
          <span className={"btn btn-danger removal-button"}
                onClick={(event) => handleRemoveClick(event)}>Delete</span>
          <p style={{marginTop: '20px'}}>{this.props.question.text}</p>
        </div>
      </div>
    )
  }
}

export default QuestionCard;