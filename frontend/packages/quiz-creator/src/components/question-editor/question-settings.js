/**
 * question-settings.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Settings for a given question, including time limit and whether partial credit and multiple selection are allowed
 */
// Main
import React from "react";
// Components
import { Checkbox } from "@frontend/common/build"
// Functions
import handleCheckboxChange from "../../functions/question-editor/question-settings/handleCheckboxChange";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-options.css"

class QuestionSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.setQuestions = props.setQuestions
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.state.activeQuestion !== this.props.state.activeQuestion) {
            this.setState({ activeQuestion: this.props.state.activeQuestion,
                questions: this.props.state.questions })
        }
        if (prevProps.state.questions !== this.props.state.questions) {
            this.setState({ activeQuestion: this.props.state.activeQuestion,
                questions: this.props.state.questions })
        }
        console.log(this.state.activeQuestion)
    }

    render() {
        return (
            <div className={"card card-very-dark mb-2"}>
                <div className={"card-body pb-2 pt-2"}>
                    <div className={"pb-1"}>
                        <Checkbox label={"Enforce time limit"}
                                  isChecked={this.state.activeQuestion.isTimeLimited}
                                  handler={(label, state) => handleCheckboxChange(label, state,
                                      this.state.activeQuestion,
                                      this.state.questions,
                                      this.setQuestions)}
                        />
                    </div>
                    <div className={"pb-1"}>
                        <Checkbox label={"Allow partial credit"}
                                  isChecked={this.state.activeQuestion.isPartialCreditAllowed}
                                  handler={(label, state) => handleCheckboxChange(label, state,
                                      this.state.activeQuestion,
                                      this.state.questions,
                                      this.setQuestions)}
                        />
                    </div>
                    <div>
                        <Checkbox label={"Allow multiple selection"}
                                  isChecked={this.state.activeQuestion.isMultipleSelectionAllowed}
                                  handler={(label, state) => handleCheckboxChange(label, state,
                                      this.state.activeQuestion,
                                      this.state.questions,
                                      this.setQuestions)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionSettings;

