/**
 * question-selector.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React from "react";
// Components
import QuestionCard from "./question-card";
// Functions
import { createQuestion } from "../../functions/createQuestion"
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../../stylesheets/question-selector.css"

class QuestionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: props.questions, activeQuestion: props.activeQuestion }
        this.setQuestions = props.setQuestions;
        this.setActiveQuestion = props.setActiveQuestion;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeQuestion !== this.props.activeQuestion) {
            this.setState({ activeQuestion: this.props.activeQuestion,
                questions: this.props.questions })
        }
        if (prevProps.questions !== this.props.questions) {
            this.setState({ activeQuestion: this.props.activeQuestion,
                questions: this.props.questions })
        }
    }

    render() {
        // Button, styled like a question card, used for creating new questions
        const CreateQuestionButton = () => {
            return (
                <div className="card card-body question-card card-very-dark button-card btn btn-danger mx-2"
                     onClick={() => {
                         createQuestion(
                             this.state.questions,
                             this.setQuestions,
                             this.setActiveQuestion
                         );
                         this.forceUpdate();
                     }}>
                    <h1>+</h1>
                </div>
            )
        }


        return (
            <div className={"container-fluid selector h-100 pb-2"}>
                <div className={"card card-dark card-format h-100"}>
                    <div className={"card-body mb-0"} style={{ display: 'flex', flexDirection: 'column', height: '' }}>
                        <div style={{ flex: 1 }}>

                            {/* Question Deck*/}
                            <div className="container-fluid container-no-padding h-100">
                                <div className="container-fluid question-deck h-100 pb-3
                                    d-flex flex-row flex-nowrap overflow-auto">
                                    {/* Question Cards */}
                                    {this.state.questions.map((question, index) => (
                                        <div key={index} className="h-100">
                                            <QuestionCard index={index + 1} total={this.state.questions.length}
                                                          question={question}
                                                          questions={this.state.questions}
                                                          setQuestions={this.setQuestions}
                                                          activeQuestion={this.state.activeQuestion}
                                                          setActiveQuestion={this.setActiveQuestion}
                                                          active={(question === this.state.activeQuestion)}
                                            />
                                        </div>
                                    ))}
                                    {/* Button to create new questions*/}
                                    <CreateQuestionButton />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionSelector
