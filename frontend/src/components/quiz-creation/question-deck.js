/**
 * question-deck.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 20 FEB 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React, {useState} from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'


function QuestionDeck(props) {
    const [cards, setCards] = useState([]);

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
                                {cards.map((card, index) => (
                                    <div key={index} className="h-100">
                                        <QuestionCard index={index + 1} total={cards.length}
                                                      active={(card === props.activeQuestion)}
                                                      activeQuestion={props.activeQuestion}
                                                      removeQuestion = {() => removeQuestion(card)}
                                                      onClick={() => selectQuestion(card)} />
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
        const newCard = {id: Math.random().toString(36).substring(2) + Date.now().toString(36),
            prompt: "", image: "", potentialAnswers: [], correctAnswers: [], timeLimit: 0};
        setCards([...cards, newCard]);
    }

    // Remove a question from the deck
    function removeQuestion(cardToRemove) {
        const updatedCards = cards.filter(card => card.id !== cardToRemove.id);
        setCards(updatedCards);
    }

    // Load a question into the editor
    function selectQuestion(card) {
        props.setActiveQuestion(card);
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
            <div className="d-inline-block">
                <span className="badge badge-question-number">{props.index}/{props.total}</span>
                <span className="btn btn-danger removal-button " onClick={handleRemoveClick}>X</span>
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