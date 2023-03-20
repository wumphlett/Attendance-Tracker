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
        this.setQuestions = props.setQuestions;
        this.setActiveQuestion = props.setActiveQuestion;
        this.state = { questions: props.questions, activeQuestion: props.activeQuestion }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
        if (prevProps.questions !== this.props.questions) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion })
        }
    }

    render() {
        return (
            <div className="container-fluid h-100 p-2">
                {this.state.activeQuestion === null ?
                    <QuestionPlaceholder
                        questions={this.state.questions}
                        state={this.state}
                        setQuestions={this.setQuestions}
                        setActiveQuestion={this.setActiveQuestion}
                    /> :
                    <div className="row h-100">
                        <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                            <QuestionPreview
                                state={this.state}
                                setQuestions={this.setQuestions}
                                setActiveQuestion={this.setActiveQuestion}
                            />
                        </div>
                        <div className={"col-3 container-fluid container-no-padding h-100"}> {/* Question options*/}
                            <QuestionOptions
                                state={this.state}
                                setQuestions={this.setQuestions}
                                setActiveQuestion={this.setActiveQuestion}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    };
}

export default QuestionEditor;