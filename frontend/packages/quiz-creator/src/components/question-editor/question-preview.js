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
// Functions
import handleTextChange from "../../functions/question-editor/question-prompt/handleTextChange";
import handleTextPaste from "../../functions/question-editor/question-prompt/handleTextPaste";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/question-editor.css'

class QuestionPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state
        this.setCreatorState = props.setCreatorState
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps.state
        }
    }

    render() {
        // Set question number
        return(
            <div className={"container-fluid h-100 p-2"}>
                <div className={"card card-dark h-100"}>
                    <div className={"card-body"} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <div className={"card card-very-dark mb-2"}> {/* Question Number*/}
                            <div className={"card-body"}>
                                <h3 className="text-center"><strong>Question {this.state.activeQuestion.index + 1}</strong></h3>
                            </div>
                        </div>
                        <div className={"card card-very-dark"} style={{ flex: 1 }}> {/* Question Content*/}
                            <div className={"card-body"}>
                                {/*Only trigger the text save api call on focus change*/}
                                <textarea className="textarea question-input"
                                          placeholder={"Enter a question here..."}
                                          value={this.state.activeQuestion.text}
                                          onChange={(event) => handleTextChange(event, this.state, this.setCreatorState)}
                                          onPaste={(event) => handleTextPaste(event, this.state, this.setCreatorState)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionPreview