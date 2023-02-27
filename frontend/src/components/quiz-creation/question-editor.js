/**
 * question-editor.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 21 FEB 23
 *
 * Question preview and options for a quiz currently loaded in the quiz creator
 */
// Main
import React, { useEffect } from 'react'
// Components
import QuestionOptions from './question-options'
// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/quiz-creation.css'
import '../../stylesheets/quiz-creation/quiz-editor.css'
import TemplateFactory from "bootstrap/js/src/util/template-factory";

function QuestionEditor(props) {
    return (
        <div className="container-fluid h-100">
            {props.activeQuestion === null ? <PlaceholderContainer
                    questions={props.questions} setQuestions={props.setQuestions} setActiveQuestion={props.setActiveQuestion}/> :
                <div className="row h-100">
                    <div className="col-9 container-fluid container-no-padding h-100"> {/* Question card preview */}
                        <QuestionPreview
                            questions={props.questions}
                            setQuestions={props.setQuestions}
                            activeQuestion={props.activeQuestion}
                        />
                    </div>
                    <div className="col-3 container-fluid container-no-padding h-100"> {/* Question options */}
                        <QuestionOptions
                            questions={props.questions}
                            setQuestions={props.setQuestions}
                            activeQuestion={props.activeQuestion}
                        />
                    </div>
                </div>}
        </div>
    );
}

// Contains text editor for creating and modifying prompts
function QuestionPreview(props) {
    // Set question number
    let questionNumber;
    if (props.questions !== null && props.activeQuestion !== null) {
        questionNumber = (props.questions.findIndex(question => question.id === props.activeQuestion.id) + 1).toString();
    }

    // Display info about the questions (TEMP)
    useEffect(() => {
        console.log(props.questions)
    });


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
                            <textarea className="question-input" placeholder={"Enter a question here..."}
                                      value={props.activeQuestion.prompt}
                                      onChange={onChange} onPaste={onPaste} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Modify the question object when the prompt is changed (characters are typed)
    function onChange(event) {
        let questionToModify = props.activeQuestion;
        questionToModify.prompt = event.target.value;
        modifyQuestion(questionToModify);
    }

    // When text is copy-pasted in, onChange won't grab it until that pasted text is changed.
    function onPaste(event) {
        // So create new prompt from combination of existing prompt and the pasted text
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const { selectionStart, selectionEnd } = event.target;
        const textBeforeSelection = props.activeQuestion.prompt.slice(0, selectionStart);
        const textAfterSelection = props.activeQuestion.prompt.slice(selectionEnd);
        const newText = textBeforeSelection + pastedText + textAfterSelection;

        // then assign that new prompt to the question object
        let questionToModify = props.activeQuestion;
        questionToModify.prompt = newText;
        modifyQuestion(questionToModify);

        // finally, set the cursor position to end of pasted text
        event.target.value = props.activeQuestion.prompt
        const cursorPosition = selectionStart + pastedText.length;
        event.target.selectionStart = cursorPosition;
        event.target.selectionEnd = cursorPosition;
    }

    // Modify the prompt of an existing question
    function modifyQuestion(questionToModify) {
        let newQuestions = [...props.questions];
        const index = newQuestions.findIndex((question) => question.id === questionToModify.id);
        newQuestions[index] = questionToModify;
        props.setQuestions(newQuestions);
    }
}

// Container in place of the preview containing only a button to create an initial question
function PlaceholderContainer(props) {

    // When an initial question is created, set that question to active
    useEffect(() => {
        if (props.questions.length > 0) {
            props.setActiveQuestion(props.questions[0])
        }
    }, [props.questions]);

    return (
        <div className="row h-100">
            <div className="container-fluid h-100 p-2">
                <div className="card card-dark card-format h-100">
                    <div className="card-body justify-content-center" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <div className="card card-very-dark align-self-center btn btn-danger" onClick={addQuestion}>
                            <div className="card-body">
                                <h3 className="text-center"><strong>Add a question...</strong></h3>
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
        const isPartialCreditAllowed = false;
        const isMultipleSelectionAllowed = false;
        const newQuestion = {
            id: Math.random().toString(36).substring(2) + Date.now().toString(36),
            prompt: "",
            image: "",
            potentialAnswers: [],
            correctAnswers: [],
            isTimeLimited: isTimeLimited,
            timeLimit: timeLimit,
            isPartialCreditAllowed: isPartialCreditAllowed,
            isMultipleSelectionAllowed: isMultipleSelectionAllowed
        };
        props.setQuestions([...props.questions, newQuestion]);
    }
}

export default QuestionEditor;