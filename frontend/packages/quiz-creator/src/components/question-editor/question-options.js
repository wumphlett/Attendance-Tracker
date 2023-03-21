/**
 * question-options.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 MAR 23
 *
 * Question settings and answers
 */
// Main
import React from "react";
// Components
import QuestionSettings from "./question-settings";
import QuestionAnswers from "./question-answers";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/question-editor.css'
import '../../stylesheets/question-options.css'

class QuestionOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
        this.setQuestions = props.setQuestions;
        this.setActiveQuestion = props.setActiveQuestion;
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
                            state={this.state}
                            setQuestions={this.setQuestions}
                        />
                        <HeaderCard text={"Answers"}/>
                        <QuestionAnswers
                            state={this.state}
                            setQuestions={this.setQuestions}
                        />
                    </div>
                </div>
            </div>
        )
    };
}

export default QuestionOptions;