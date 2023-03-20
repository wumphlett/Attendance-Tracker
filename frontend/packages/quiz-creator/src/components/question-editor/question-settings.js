/**
 * question-settings.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Various options for quiz questions, including time limit and answer options
 */
// Main
import React from "react";
// Components
import { Checkbox } from "@frontend/common/build"
// Functions
import handleCheckboxChange from "../../functions/handleCheckboxChange";
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
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

