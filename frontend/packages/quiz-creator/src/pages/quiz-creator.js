/**
 * quiz-creator.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 19 MAR 23
 *
 * Quiz creator UI
 */
// Main
import React, { useState } from 'react'
// Components
import { Navbar } from "@frontend/common/build";
import QuestionEditor from "../components/question-editor/question-editor";
import QuestionSelector from "../components/question-selector/question-selector";
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/quiz-creation.css'

function QuizCreator() {
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);


    return (
        <div>
            <div className={"bg-black"} style={{ height: '60px' }}>
                <Navbar />
            </div>
            <div className="container-fluid content-container page-dark">
                <div className={"row"} style={{ height: 'calc(0.75 * (100vh - 60px))' }}>
                    <div> {/* Quiz Options */}

                    </div>
                    <div className="h-100"> {/* Question Editor */}
                        <QuestionEditor
                            questions={questions}
                            setQuestions={setQuestions}
                            activeQuestion={activeQuestion}
                            setActiveQuestion={setActiveQuestion}
                        />
                    </div>
                </div>
                <div className={"row"} style={{ height: 'calc(0.25 * (100vh - 60px))' }}>
                    <div className={"container-fluid"}> {/* Question Selector*/}
                        <QuestionSelector
                            questions={questions}
                            setQuestions={setQuestions}
                            activeQuestion={activeQuestion}
                            setActiveQuestion={setActiveQuestion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizCreator;