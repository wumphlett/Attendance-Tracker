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
        this.setQuestions = props.setQuestions
        this.setActiveQuestion = props.setActiveQuestion
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
        if(prevProps.questions !== this.props.questions) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
    }

    render() {
        if (typeof this.setActiveQuestion === 'undefined') {
            return null;
        }

        // Set question number
        let questionNumber;
        if (this.state.questions !== null && this.state.activeQuestion !== null) {
            questionNumber = (this.state.questions.
            findIndex(question => question.id === this.state.activeQuestion.id) + 1).toString();
        }

        return(
            <div className={"container-fluid h-100 p-2"}>
                <div className={"card card-dark h-100"}>
                    <div className={"card-body"} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <div className={"card card-very-dark mb-2"}> {/* Question Number*/}
                            <div className={"card-body"}>
                                <h3 className="text-center"><strong>Question {questionNumber}</strong></h3>
                            </div>
                        </div>
                        <div className={"card card-very-dark"} style={{ flex: 1 }}> {/* Question Content*/}
                            <div className={"card-body"}>
                                <textarea className="textarea question-input"
                                          placeholder={"Enter a question here..."}
                                          value={this.state.activeQuestion.prompt}
                                          onChange={(event) => handleTextChange(event,
                                                              this.state.activeQuestion,
                                                              this.state.questions,
                                                              this.setQuestions)}
                                          onPaste={(event) => handleTextPaste(event,
                                                              this.state.activeQuestion,
                                                              this.state.questions,
                                                              this.setQuestions)}
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