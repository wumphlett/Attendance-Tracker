/**
 * question-placeholder.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Placeholder screen for when there are no questions yet created in a quiz.
 */
// Main
import React from 'react';
// Functions
import {createQuestion} from "../../functions/createQuestion";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/question-editor.css'


class QuestionPlaceholder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row h-100">
        <div className="container-fluid h-100 p-2">
          <div className="card card-dark h-100">
            <div className="card-body justify-content-center"
                 style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
              <div className="card btn button-card card-very-dark align-self-center" onClick={
                () => createQuestion(this.props.presentationId, this.props.questions, this.props.setQuestions, this.props.setActiveQuestion)
              }>
                <div className="card-body">
                  <h3 className="text-center"><strong>Add a question...</strong></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionPlaceholder