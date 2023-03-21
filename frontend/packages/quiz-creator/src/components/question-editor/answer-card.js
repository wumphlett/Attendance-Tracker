/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 27 FEB 23
 *
 * Card containing a possible answer to a question and its correctness
 */
// Main
import React from "react";
// Components
import { Checkbox } from "@frontend/common/build"
// Functions
import { handleCheckboxChange } from "../../functions/question-editor/question-answers/handleCheckboxChange";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-editor.css"

class AnswerCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: props.questions,
                    activeQuestion: props.activeQuestion,
                    activeAnswer: props.activeAnswer }
        this.setQuestions = props.setQuestions
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.questions !== this.props.questions) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
        if(prevProps.activeAnswer !== this.props.activeAnswer) {
            this.setState({ questions: this.props.questions, activeQuestion: this.props.activeQuestion, activeAnswer: this.props.activeAnswer });
        }
    }

    render() {
        return (
            <div className={"card answer-card card-very-dark my-2"}>
                <div className={"card-body center"}>
                    <Checkbox
                        isChecked={this.state.activeQuestion.correctAnswers.includes(this.state.activeAnswer)}
                        handler={(label, state) => handleCheckboxChange(
                            this.state.activeAnswer,
                            state,
                            this.state.activeQuestion,
                            this.state.questions,
                            this.setQuestions
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default AnswerCard;