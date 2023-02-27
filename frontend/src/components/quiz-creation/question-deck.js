/**
 * question-deck.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 22 FEB 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'


function QuestionDeck(props) {

    // Markup
    return (
        // Container holding the question deck
        <div className="container-fluid container-no-padding p-2">
            <div className="card card-dark card-format h-100">
                <div className="card-body mb-0" style={{ display: 'flex', flexDirection: 'column', height: '' }}>
                    <div style={{ flex: 1 }}>

                        {/* Question Deck*/}
                        <div className="container-fluid container-no-padding h-100">
                            <div className="d-flex flex-row flex-nowrap question-deck h-100 pb-3 overflow-auto">
                                {/* Question Cards */}
                                {props.questions.map((question, index) => (
                                    <div key={index} className="h-100">
                                        <QuestionCard index={index + 1} total={props.questions.length}
                                                      question={question}
                                                      active={(question === props.activeQuestion)}
                                                      activeQuestion={props.activeQuestion}
                                                      removeQuestion = {() => removeQuestion(question)}
                                                      onClick={() => selectQuestion(question)} />
                                    </div>
                                ))}
                                {/* Button to add additional question cards*/}
                                <AddCardButton onClick={addQuestion} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

    // Add a new question to the deck
    function addQuestion() {
        const isTimeLimited = false;
        const timeLimit = 0;
        const allowPartialCredit = false;
        const newQuestion = {
            id: Math.random().toString(36).substring(2) + Date.now().toString(36),
            prompt: "",
            image: "",
            potentialAnswers: [],
            correctAnswers: [],
            isTimeLimited: isTimeLimited,
            timeLimit: timeLimit,
            allowPartialCredit: allowPartialCredit
        };
        props.setQuestions([...props.questions, newQuestion]);
    }

    // Remove a question from the deck
    function removeQuestion(questionToRemove) {
        const updatedQuestions = props.questions.filter(question => question.id !== questionToRemove.id);
        props.setQuestions(updatedQuestions);
    }

    // Load a question into the editor
    function selectQuestion(questionToSelect) {
        props.setActiveQuestion(props.questions.find(question => question.id === questionToSelect.id));
    }
}

// Cards representing questions in the quiz that can be loaded into the editor
function QuestionCard(props) {
    const handleRemoveClick = (event) => {
        event.stopPropagation();
        props.removeQuestion(props.activeQuestion);
    }

    return (
        <div className={`card question-card card-very-dark p-2 mx-2 ${props.active ? 'question-card-active' : ''}`}
             onClick={props.onClick}>
            <div className="d-inline-block overflow-auto">
                <span className="badge badge-question-number">{props.index}/{props.total}</span>
                <span className="btn btn-danger removal-button " onClick={handleRemoveClick}>X</span>
                <p style={{ marginTop: '20px'}}>{props.question.prompt}</p>
            </div>
        </div>
    )
}

// Button, styled like a question card, used for creating new questions
function AddCardButton(props) {
    return (
        <div className="card card-body question-card card-very-dark button-card btn btn-danger mx-2" onClick={props.onClick}>
            <h1>+</h1>
        </div>
    )
}

export default QuestionDeck