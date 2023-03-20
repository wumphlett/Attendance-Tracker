/**
 * question-editor.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 19 MAR 23
 *
 * Question preview and options for a quiz currently loaded in the quiz creator
 */
// Main
import React from 'react';
// Components
// Functions
// Stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/question-editor.css'

class QuestionPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state
        this.setQuestions = props.setQuestions
        this.setActiveQuestion = props.setActiveQuestion
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
        if(prevProps.questions !== this.props.questions) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
    }

    render() {
        return(
            <div>

            </div>
        )
    }
}

export default QuestionPreview