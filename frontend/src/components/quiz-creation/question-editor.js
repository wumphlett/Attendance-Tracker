/**
 * question-editor.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 17 FEB 23
 *
 * Question preview and options for a quiz currently loaded in the quiz creator
 */
// Main
import React, { useState, useEffect, useRef } from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/quiz-editor.css'

function QuestionEditor(props) {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                    <QuestionPreview questions={props.questions} activeQuestion={props.activeQuestion}/>
                </div>
                <div className="col-3 container-fluid container-no-padding h-100"> {/* Question options */}
                    <QuestionOptions />
                </div>
            </div>
        </div>
    );
}

function QuestionPreview(props) {
    let questionNumber = "0"
    if (props.questions !== null && props.activeQuestion !== null) {
        questionNumber = (props.questions.findIndex(question => question.id === props.activeQuestion.id) + 1).toString();
    }
    let body = "Enter question here..."
    if (props.activeQuestion !== null && props.activeQuestion.prompt !== null) {
        body = props.activeQuestion.prompt;
    }
    body = "Enter question here..."

    const [promptText, setPromptText] = useState("");
    const textareaRef = useRef(null)
    useEffect(() => {
        console.log(`${promptText}`);
    }, [promptText]);

    return (
        <div className="container-fluid h-100 p-2">
            <div className="card card-dark card-format h-100">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div className="card card-very-dark mb-2"> {/* Question Number */}
                        <div className="card-body">
                            <h3 className="text-center"><strong>Question {questionNumber}</strong></h3>
                        </div>
                    </div>
                    <div className="card card-very-dark" style={{ flex: 1 }}> {/* Question Content */}
                        <div className="card-body">
                            <textarea className="question-input" ref={textareaRef} placeholder={body}
                                      value={promptText}
                                      onChange={handleTextAreaType} onPaste={handleTextAreaPaste} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function handleTextAreaType(event) {
        setPromptText(event.target.value);
    }

    // When text is copy-pasted in, onChange won't grab it until that text is changed.
    function handleTextAreaPaste(event) {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const { selectionStart, selectionEnd } = event.target;
        const textBeforeSelection = promptText.slice(0, selectionStart);
        const textAfterSelection = promptText.slice(selectionEnd);
        const newText = textBeforeSelection + pastedText + textAfterSelection;
        event.target.value = newText
        setPromptText(newText);

        // Set cursor position to end of pasted text
        const cursorPosition = selectionStart + pastedText.length;
        event.target.selectionStart = cursorPosition;
        event.target.selectionEnd = cursorPosition;
    }
}

function QuestionOptions() {
    return (
        <div className="container-fluid h-100 p-2">
            <div className="card card-dark card-format">
                <div className="card-body">
                    <div className="card card-very-dark mb-2"> {/* Question Number */}
                        <div className="card-body">
                            <h3 className="text-center"><strong>Options</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionEditor;