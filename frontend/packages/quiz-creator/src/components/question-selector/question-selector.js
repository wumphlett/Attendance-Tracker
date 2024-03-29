/**
 * question-selector.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React from "react";
// Components
import QuestionCard from "./question-card";
// Functions
import {createQuestion} from "../../functions/createQuestion"
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-selector.css"

class QuestionSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Button, styled like a question card, used for creating new questions
    const CreateQuestionButton = () => {
      return (
        <div className="card card-body add-question-card card-very-dark button-card btn btn-danger mr-0"
             onClick={() => {
               createQuestion(
                 this.props.presentationId,
                 this.props.questions,
                 this.props.setQuestions,
                 this.props.setActiveQuestion
               );
               this.forceUpdate();
             }}>
          <h1>+</h1>
        </div>
      )
    }

    // Precise height calculation is being performed to enable use of aspect ratio for question cards
    return (
      <div className={"container-fluid selector"} style={
        {height: 'calc(0.25 * (100vh - 60px)'}
      }>
        <div className={"card card-dark"} style={
          {height: 'calc((0.25 * (100vh - 60px)) - 0.5rem)', padding: '0 0.5rem 0'}
        }>
          <div className={"container-fluid question-deck"} style={
            {height: 'calc((0.25 * (100vh - 60px)) - 0.5rem)'}
          }>
            {/* Question Cards */}
            {this.props.questions.map((question, index) => (
              <div key={index} className="h-100">
                <QuestionCard index={index + 1} total={this.props.questions.length}
                              question={question}
                              questions={this.props.questions}
                              setQuestions={this.props.setQuestions}
                              activeQuestion={this.props.activeQuestion}
                              setActiveQuestion={this.props.setActiveQuestion}
                />
              </div>
            ))}
            {/* Button to create new questions*/}
            <CreateQuestionButton/>

          </div>
        </div>
      </div>
    )
  }
}

export default QuestionSelector
