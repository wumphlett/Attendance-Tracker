/**
 * question-editor.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 17 FEB 23
 *
 * Question preview and options for a quiz currently loaded in the quiz creator
 */
// Main
import React, { useState } from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'

function QuestionEditor(props) {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                    <QuestionPreview questions={props.questions} activeQuestion={props.activeQuestion}/>
                </div>
                <div className="col-3 container-fluid container-no-padding h-100"> {/* Question options */}
                    <QuestionOptions />
                </div>
            </div>
        </div>
    );
}

function QuestionPreview(props) {
    let questionNumber = "0"
    console.log(props.questions)
    console.log(props.activeQuestion)
    if (props.questions !== null && props.activeQuestion !== null) {
        questionNumber = (props.questions.findIndex(question => question.id === props.activeQuestion.id) + 1).toString();
    }
    console.log(questionNumber)

    return (
        <div className="container-fluid h-100 p-2">
            <div className="card card-dark card-format h-100">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div className="card card-very-dark mb-2"> {/* Question Number */}
                        <div className="card-body">
                            <h3 className="text-center"><strong>Question {questionNumber}</strong></h3>
                        </div>
                    </div>
                    <div className="card card-very-dark" style={{ flex: 1 }}> {/* Question Content */}
                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuestionOptions() {
    return (
        <div className="container-fluid h-100 p-2">
            <div className="card card-dark card-format">
                <div className="card-body">
                    <div className="card card-very-dark mb-2"> {/* Question Number */}
                        <div className="card-body">
                            <h3 className="text-center"><strong>Options</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionEditor;