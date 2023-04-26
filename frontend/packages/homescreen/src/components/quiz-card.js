/**
 * quiz-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Card representing an available quiz
 */
// Main
import React from "react";
// Functions
import { deleteQuiz } from "../functions/deleteQuiz";
import { launchQuiz } from "../functions/launchQuiz";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

import axios from "axios"

class QuizCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            presentation: props.presentation,
            presentations: props.presentations,
            inRenamingMode: false,
        }
        this.setUserState = props.setUserState
        this.inputRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.presentations !== prevState.presentations) {
            return { presentations: nextProps.presentations }
        }
    }

    onLaunchPress = () => {
        console.log(this.state.presentation)
        launchQuiz(this.state.presentation)
    }

    enterRenamingMode = (event) => {
        event.stopPropagation()
        this.setState({ inRenamingMode: true })
    }

    exitRenamingMode = () => {
        this.setState({ inRenamingMode: false })
    }

    handleInputChange = (event) => {
        const title = event.target.value;
        this.setState({ presentation: { ...this.state.presentation, name: title } }, () => {
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(this.state.presentation.name.length, this.state.presentation.name.length);
        });
    };

    handleInputPaste = (event) => {
        event.preventDefault();
        const pastedText = event.clipboardData.getData('Text');
        const {selectionStart, selectionEnd} = event.target;
        const textBeforeSelection = this.state.presentation.name.slice(0, selectionStart);
        const textAfterSelection = this.state.presentation.name.slice(selectionEnd);
        let newTitle = textBeforeSelection + pastedText + textAfterSelection;
        this.setState({ presentation: { ...this.state.presentation, name: newTitle } }, () => {
            // finally, set the cursor position to end of pasted text
            const cursorPosition = selectionStart + pastedText.length;
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        });


    }

    saveQuizTitle = (event) => {
        this.setState({ presentation: { ...this.state.presentation, name: event.target.value}}, () => {
            axios.patch(`presentations/${this.state.presentation.id}/`, {
                name: event.target.value,
            }).then((r) => {
        
            });
            this.exitRenamingMode();
        })
    }


    render() {
        return (
            <div className={"card card-body quiz-card secondary-dark-theme mt-2 d-flex flex-row align-items-center"}>
                <div className={"card primary-dark-theme quiz-title-card text-center align-items-center px-2 py-0"}
                onDoubleClick={this.enterRenamingMode}>
                    {!this.state.inRenamingMode ? (
                        <h3 className={"quiz-title text-dark-theme"}>{this.state.presentation.name}</h3>
                    ) : (
                        <input
                            className={"title-entry-input"}
                            type={"text"}
                            value={this.state.presentation.name}
                            key={this.state.presentation.name}
                            ref={this.inputRef}
                            onChange={this.handleInputChange}
                            onPaste={this.handleInputPaste}
                            onBlur={this.saveQuizTitle}
                        />
                    )}
                </div>

                <div className={"quiz-options pb-0"}>
                    <button className={"btn btn-success mb-0 mx-1"} onClick={this.onLaunchPress}>Launch</button>
                    <button className={"btn btn-primary mb-0 mx-1"} onClick={() => {window.location.href = `/create/?p=${this.state.presentation.id}`}}>Edit</button>
                    <button className={"btn btn-danger mb-0 mx-1"} onClick={
                        () => deleteQuiz(this.state.presentation, this.state.presentations, this.setUserState)
                    }>Delete</button>
                </div>
                <div className={"card primary-dark-theme question-count-card px-2 py-2"}>
                    <p className={"m-0 p-0 text-dark-theme"}>{this.state.presentation.question_set.length} Question{this.state.presentation.question_set.length !== 1 ? 's' : ''}</p>
                </div>
            </div>
        )
    }
}

export default QuizCard;