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
    }


    render() {
        return (
            <div className={"card card-very-dark mb-2"}>
                <div className={"card-body pb-2 pt-2"}>
                    {/*<div className={"pb-1"}>*/}
                    {/*    /!*NOT CURRENTLY SUPPORTED IN BACKEND RESPONSE MODEL *!/*/}
                    {/*    <Checkbox label={"Allow partial credit"}*/}
                    {/*              isChecked={this.props.activeQuestion.is_partial_allowed}*/}
                    {/*              handler={(label, state) => handleCheckboxChange(label, state,*/}
                    {/*                  this.props.activeQuestion,*/}
                    {/*                  this.props.setActiveQuestion)}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={"pb-1"}>
                        <Checkbox label={"Allow multiple selection"}
                                  isChecked={this.props.activeQuestion.is_multiple_selection_allowed}
                                  handler={(label, state) => handleCheckboxChange(label, state,
                                      this.props.activeQuestion,
                                      this.props.setActiveQuestion)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionSettings;

