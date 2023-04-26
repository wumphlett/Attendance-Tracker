/**
 * question-editor.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Question preview and options for a quiz currently loaded in the quiz creator
 */
// Main
import React from 'react';
// Components
import QuestionPlaceholder from "./question-placeholder";
import QuestionPreview from "./question-preview";
import QuestionOptions from "./question-options";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/question-editor.css'

class QuestionEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid h-100 p-2">
                {this.props.activeQuestion === null ?
                    <QuestionPlaceholder
                        presentationId={this.props.presentationId}
                        questions={this.props.questions}
                        setQuestions={this.props.setQuestions}
                        setActiveQuestion={this.props.setActiveQuestion}
                    /> :
                    <div className="row h-100">
                        <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                            <QuestionPreview
                                questions={this.props.questions}
                                activeQuestion={this.props.activeQuestion}
                                setQuestions={this.props.setQuestions}
                                setActiveQuestion={this.props.setActiveQuestion}
                            />
                        </div>
                        <div className={"col-3 container-fluid container-no-padding h-100"}> {/* Question options*/}
                            <QuestionOptions
                                activeQuestion={this.props.activeQuestion}
                                setActiveQuestion={this.props.setActiveQuestion}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    };
}

export default QuestionEditor;