/**
 * question-deck.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 16 FEB 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React, {useState} from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'


function QuestionDeck() {
    const [cards, setCards] = useState([]);

    return (
        <div className="container-fluid container-no-padding p-2">
            <div className="card card-dark card-format h-100">
                <div className="card-body mb-0" style={{ display: 'flex', flexDirection: 'column', height: '' }}>
                    <div style={{ flex: 1 }}>
                        <CardDeck cards={cards} setCards={setCards} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardDeck(props) {
    return (
        <div className="container-fluid container-no-padding h-100">
            <div className="d-flex flex-row flex-nowrap h-100 pb-3 overflow-auto">
                <QuestionCard />
                {props.cards.map((card, index) => (
                    <div key={index} className="h-100">{card}</div>
                ))}

                <AddCardButton onClick={addSlide} />
            </div>
        </div>
    )

    function addSlide() {
        console.log("Adding new slide...")
        const newCard = <QuestionCard />;
        props.setCards([...props.cards, newCard]);
    }
}

function QuestionCard() {
    return (
        <div className="card question-mini-card card-very-dark mx-2">1/20</div>
    )
}

function AddCardButton(props) {
    return (
        <div className="card card-body question-mini-card card-very-dark button-card btn btn-danger mx-2" onClick={props.onClick}>
            <h1>+</h1>
        </div>
    )
}


export default QuestionDeck