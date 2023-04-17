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
        this.state = props.state;
        this.setCreatorState = props.setCreatorState;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            if (nextProps.state.questions.length > 0) {
                return {questions: nextProps.state.questions, activeQuestion: nextProps.state.questions[0]}
            } else {
                return nextProps.state
            }
        }
    }

    render() {
        return (
            <div className="container-fluid h-100 p-2">
                {this.state.activeQuestion === null ?
                    <QuestionPlaceholder
                        state={this.state}
                        setCreatorState={this.setCreatorState}
                    /> :
                    <div className="row h-100">
                        <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                            <QuestionPreview
                                state={this.state}
                                setCreatorState={this.setCreatorState}
                            />
                        </div>
                        <div className={"col-3 container-fluid container-no-padding h-100"}> {/* Question options*/}
                            <QuestionOptions
                                state={this.state}
                                setCreatorState={this.setCreatorState}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    };
}

export default QuestionEditor;