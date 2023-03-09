/**
 * quiz-creation.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 21 FEB 23
 *
 * Quiz creator UI
 */
// Main
import React, {useState} from 'react'
// Components
import { Navbar } from '@common'
import QuestionEditor from '../components/quiz-creation/question-editor'
import QuestionDeck from '../components/quiz-creation/question-deck'
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/quiz-creation.css'

function QuizCreation() {
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className="container-fluid content-container page-dark">
                <div className="row h-75">
                    <div> {/* Quiz options */}

                    </div>
                    <div className="h-100"> {/* Question card editor */}
                        <QuestionEditor questions={questions} setQuestions={setQuestions}
                                        activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion}/>
                    </div>
                </div>
                <div className="row h-25">
                    <div className="container-fluid"> {/* Question card deck */}
                        <QuestionDeck questions={questions} setQuestions={setQuestions}
                                      activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizCreation;