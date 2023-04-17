/**
 * quiz-creator.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 19 MAR 23
 *
 * Quiz creator UI
 */
// Main
import React, { useState } from 'react'
// Components
import { Navbar } from "@frontend/common/build";
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
        this.setState = this.setState.bind(this)
    }

      componentDidMount() {
        this.set_quiz_list();
      }

      set_quiz_list = () => {
        let presentationId = window.location.pathname.split("/").pop();
        if (presentationId === "") {
          window.location.href = "/"
        }
        axios.get(`presentations/${presentationId}/`).then((r) => {
          this.setState({
              presentationId: presentationId,
              questions: r.data.question_set,
            }
          )
        })
      };

    render() {
        return (
          <div>
            <div className={"bg-black"} style={{ height: '60px' }}>
                <Navbar />
            </div>
            <div className="container-fluid content-container page-dark">
                <div className={"row"} style={{ height: 'calc(0.75 * (100vh - 60px))' }}>
                    <div> {/* Quiz Options */}

                    </div>
                    <div className="h-100"> {/* Question Editor */}
                        <QuestionEditor
                            state={this.state}
                            setCreatorState={this.setState}
                        />
                    </div>
                </div>
                <div className={"row"} style={{ height: 'calc(0.25 * (100vh - 60px))' }}>
                    <div className={"container-fluid"}> {/* Question Selector*/}
                        <QuestionSelector
                            state={this.state}
                            setCreatorState={this.setState}
                        />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default QuizCreator;