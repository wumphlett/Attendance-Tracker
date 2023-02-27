/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 26 FEB 23
 *
 * Card containing a possible answer to a question and its correctness
 */
// Main
import React, {useEffect} from 'react'
// Components
import Checkbox from '../global/checkbox'
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/answer-card.css'
import '../../stylesheets/quiz-creation/answer-creation.css'

class AnswerCard extends React.Component {
    constructor(props) {
        super(props)
        this.questions = props.questions
        this.setQuestions = props.setQuestions
        this.activeQuestion = props.activeQuestion
        this.activeAnswer = props.activeAnswer
        this.index = props.index

        this.onChange = this.onChange.bind(this)
        this.onPaste = this.onPaste.bind(this)
    }

    onChange(event) {
        let questionToModify = this.activeQuestion
        questionToModify.potentialAnswers[this.index].text = event.target.value
        this.questions.map((question) => question.id === questionToModify.id ? questionToModify : question);
        event.target.value = this.activeAnswer.text
        this.forceUpdate()
    }

    onPaste(event) {
        // So create new prompt from combination of existing prompt and the pasted text
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const { selectionStart, selectionEnd } = event.target;
        const textBeforeSelection = this.activeAnswer.slice(0, selectionStart);
        const textAfterSelection = this.activeAnswer.prompt.slice(selectionEnd);
        const newText = textBeforeSelection + pastedText + textAfterSelection;

        // then assign that new prompt to the question object
        let questionToModify = this.activeQuestion;
        questionToModify.potentialAnswers[this.index].text = newText;
        this.questions.map((question) => question.id === questionToModify.id ? questionToModify : question);
        this.forceUpdate()

        // finally, set the cursor position to end of pasted text
        const cursorPosition = selectionStart + pastedText.length;
        event.target.selectionStart = cursorPosition;
        event.target.selectionEnd = cursorPosition;
    }

    render() {
        return (
            <div className="card card-selectable card-very-dark my-2">
                <div className="card-body center">
                    <Checkbox />
                    <textarea className="answer-input"
                              placeholder={"Enter an answer..."}
                              value={this.activeAnswer.text}
                              onChange={this.onChange}
                    />
                </div>
                {/*<span className="btn btn-danger removal-button" onClick={(event) => handleRemoveClick(event, props.answer)}>X</span>*/}
            </div>
        )
    }
}

export default AnswerCard