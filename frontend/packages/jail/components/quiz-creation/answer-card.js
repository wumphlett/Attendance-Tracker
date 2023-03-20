/**
 * answer-card.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 27 FEB 23
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
        this.setQuestions = props.setQuestions
        this.id = props.id
        this.state = { questions: props.questions, activeQuestion: props.activeQuestion, activeAnswer: props.activeAnswer}

        this.onChange = this.onChange.bind(this)
        this.onPaste = this.onPaste.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleRemovalClick = this.handleRemovalClick.bind(this)
        this.removeAnswer = this.removeAnswer.bind(this)
        this.modifyQuestion = this.modifyQuestion.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
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

    onChange(event) {
        let questionToModify = this.state.activeQuestion
        const index = questionToModify.potentialAnswers.findIndex((answer) => answer.id === this.id);
        questionToModify.potentialAnswers[index].text = event.target.value
        this.state.questions.map((question) => question.id === questionToModify.id ? questionToModify : question);
        event.target.value = this.state.activeAnswer.text
        this.forceUpdate()
    }

    onPaste(event) {
        // So create new prompt from combination of existing prompt and the pasted text
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const { selectionStart, selectionEnd } = event.target;
        const textBeforeSelection = this.state.activeAnswer.slice(0, selectionStart);
        const textAfterSelection = this.state.activeAnswer.prompt.slice(selectionEnd);
        const newText = textBeforeSelection + pastedText + textAfterSelection;

        // then assign that new prompt to the question object
        let questionToModify = this.state.activeQuestion;
        const index = questionToModify.potentialAnswers.findIndex((answer) => answer.id === this.id);
        questionToModify.potentialAnswers[index].text = newText
        this.state.questions.map((question) => question.id === questionToModify.id ? questionToModify : question);
        this.forceUpdate()

        // finally, set the cursor position to end of pasted text
        const cursorPosition = selectionStart + pastedText.length;
        event.target.selectionStart = cursorPosition;
        event.target.selectionEnd = cursorPosition;
    }

    handleCheckboxChange(label, state) {
        let questionToModify = this.state.activeQuestion
        if (state === true && !this.state.activeQuestion.correctAnswers.includes(this.state.activeAnswer)) {
            if (questionToModify.isMultipleSelectionAllowed === false) {
                questionToModify.correctAnswers = []
            }
            questionToModify.correctAnswers.push(this.state.activeAnswer)
        }
        else if (state === false && this.state.activeQuestion.correctAnswers.includes(this.state.activeAnswer)) {
            const index = questionToModify.correctAnswers.findIndex((answer) => answer.id === this.state.activeAnswer.id)
            questionToModify.correctAnswers.splice(index, 1)
        }
        this.modifyQuestion(questionToModify)
    }

    // Remove answer
    handleRemovalClick(event) {
        event.stopPropagation();
        this.removeAnswer()
    }

    removeAnswer() {
        let modifiedQuestion = this.state.activeQuestion;
        modifiedQuestion.potentialAnswers =
            modifiedQuestion.potentialAnswers.filter(answer => answer !== this.state.activeAnswer)
        this.modifyQuestion(modifiedQuestion);
    }

    modifyQuestion(modifiedQuestion) {
        let newQuestions = [...this.state.questions];
        const index = newQuestions.findIndex((question) => question.id === modifiedQuestion.id);
        newQuestions[index] = modifiedQuestion;
        this.setQuestions(newQuestions);
    }

    render() {
        return (
            <div className="card answer-card card-very-dark my-2">
                <div className="card-body center">
                    <Checkbox
                        isChecked={this.state.activeQuestion.correctAnswers.includes(this.state.activeAnswer)}
                        handler={this.handleCheckboxChange}
                    />
                    <textarea className="answer-input"
                              placeholder={"Enter an answer..."}
                              value={this.state.activeAnswer.text}
                              onChange={this.onChange}
                    />
                    <span className="btn btn-danger answer-removal-button" onClick={this.handleRemovalClick}>X</span>

                </div>
            </div>
        )
    }
}

export default AnswerCard