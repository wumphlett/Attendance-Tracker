/**
 * question-deck.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 16 FEB 23
 *
 * Deck of question cards for a quiz currently loaded in the quiz creator
 */
// Main
import React from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'

function QuestionDeck() {
    return (
        <div className="container-fluid container-no-padding p-2 h-100">
            <div className="card card-dark card-format h-100">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '' }}>
                    <div style={{ flex: 1 }}>
                        <CardDeck />
                    </div>
                </div>
            </div>
        </div>
    )
}

function CardDeck() {
    return (
        <div className="container-fluid container-no-padding h-100">
            <div className="d-flex flex-row flex-nowrap h-100 overflow-auto">
                <QuestionCard />
                <QuestionCard />

                <AddCardButton />
            </div>
        </div>
    )
}

function QuestionCard() {
    return (
        <div className="card card-body question-mini-card card-very-dark mx-2">1/20</div>
    )
}

function AddCardButton() {
    return (
        <div className="card card-body question-mini-card card-very-dark button-card btn btn-danger mx-2">
            <h1>+</h1>
        </div>
    )
}

export default QuestionDeck