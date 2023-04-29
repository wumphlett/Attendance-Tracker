/**
 * quiz-creator.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 19 MAR 23
 *
 * Quiz creator UI
 */
// Main
import React from 'react'
// Components
import {Navbar} from "@frontend/common/build";
import Logo from "@frontend/common/build/images/logo.png"
import QuestionEditor from "../components/question-editor/question-editor";
import QuestionSelector from "../components/question-selector/question-selector";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/quiz-creation.css'

import axios from 'axios';


class QuizCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationId: null,
      questions: [],
      activeQuestion: null,
    }
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);

    let presentationId = queryParams.get("p");
    if (presentationId === null) {
      window.location.href = "/"
    }
    axios.get(`presentations/${presentationId}/`).then((r) => {
      for (let question of r.data.question_set) {
        question.is_multiple_selection_allowed = question.answer_set.filter(answer => answer.is_correct).length > 1;
      }

      this.setState({
          presentationId: presentationId,
          questions: r.data.question_set,
          activeQuestion: r.data.question_set.length > 0 ? r.data.question_set[0] : null,
        }
      )
    }).catch((r) => {
      window.location.href = "/"
    })
  }

  setQuestions = (questions) => {
    this.setState({questions: questions});
  };

  setActiveQuestion = (question) => {
    this.setState({activeQuestion: question});
  }

  render() {
    return (
      <div>
        <div className={"bg-black"} style={{height: '60px'}}>
          <Navbar logo={Logo}/>
        </div>
        <div className="container-fluid content-container page-dark">
          <div className={"row"} style={{height: 'calc(0.75 * (100vh - 60px))'}}>
            <div> {/* Quiz Options */}

            </div>
            <div className="h-100"> {/* Question Editor */}
              <QuestionEditor
                presentationId={this.state.presentationId}
                questions={this.state.questions}
                setQuestions={this.setQuestions}
                activeQuestion={this.state.activeQuestion}
                setActiveQuestion={this.setActiveQuestion}
              />
            </div>
          </div>
          <div className={"row"} style={{height: 'calc(0.25 * (100vh - 60px))'}}>
            <div className={"container-fluid"}> {/* Question Selector*/}
              <QuestionSelector
                presentationId={this.state.presentationId}
                questions={this.state.questions}
                setQuestions={this.setQuestions}
                activeQuestion={this.state.activeQuestion}
                setActiveQuestion={this.setActiveQuestion}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizCreator;