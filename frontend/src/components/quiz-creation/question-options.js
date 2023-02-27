/**
 * question-options.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 26 FEB 23
 *
 * Options panel in the question editor, including question settings and answers
 */
// Main
import React from 'react'
// Components
import QuestionSettings from "./question-settings";
import QuestionAnswers from "./question-answers";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/quiz-editor.css'
import '../../stylesheets/quiz-creation/answer-creation.css'


class QuestionOptions extends React.Component {
    constructor(props) {
        super(props);
        this.setQuestions = props.setQuestions;
        this.state = { activeQuestion: props.activeQuestion, questions: props.questions}
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
        if(prevProps.questions !== this.props.questions) {
            this.setState({ activeQuestion: this.props.activeQuestion, questions: this.props.questions});
        }
    }


    render() {
        const HeaderCard = (props) => {
            return (
                <div className="card card-very-dark mb-2"> {/* Question Number */}
                    <div className="card-body">
                        <h3 className="text-center"><strong>{props.text}</strong></h3>
                    </div>
                </div>
            )
        };

        // Container card
        return (
            <div className="container-fluid h-100 p-2">
                <div className="card card-dark card-format">
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <HeaderCard text={"Options"}/>
                        <QuestionSettings
                            questions={this.state.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.state.activeQuestion}
                        />
                        <HeaderCard text={"Answers"}/>
                        <QuestionAnswers
                            questions={this.state.questions}
                            setQuestions={this.setQuestions}
                            activeQuestion={this.state.activeQuestion}
                        />
                    </div>
                </div>
            </div>

        )
    };
}

export default QuestionOptions;