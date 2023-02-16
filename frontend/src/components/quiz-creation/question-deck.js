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
        <div className="container-fluid h-100 p-2">
            <div className="card card-dark card-format">
                <div className="card-body">
                    <h1 className="text-center"><strong>Question #1</strong></h1>
                </div>
            </div>
        </div>
    )
}

export default QuestionDeck