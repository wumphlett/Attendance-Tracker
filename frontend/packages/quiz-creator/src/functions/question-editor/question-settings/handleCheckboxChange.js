/**
 * /question-settings/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in question settings, change the respective property of the active question
 */

import axios from 'axios';

// Functions
import modifyQuestion from '../modifyQuestion'

function handleCheckboxChange(label, checkboxState, state, setCreatorState) {
    if (label === "Allow partial credit") {
        let modifiedQuestion = state.activeQuestion
        modifiedQuestion.is_partial_allowed = checkboxState
        axios.patch(`questions/${modifiedQuestion.id}/`, {
            is_partial_allowed: modifiedQuestion.is_partial_allowed,
        }).then((r) => {
            modifyQuestion(modifiedQuestion, state, setCreatorState)
        });
    }
    else if (label === "Allow multiple selection") {
        let modifiedQuestion = state.activeQuestion
        modifiedQuestion.isMultipleSelectionAllowed = checkboxState
        // If single selection is enforced and multiple answers are already marked as correct, unmark all answers
        if (checkboxState === false && state.activeQuestion.correctAnswers.length > 1) {
            modifiedQuestion.correctAnswers = []
        }
        modifyQuestion(modifiedQuestion, state, setCreatorState)
    }
}

export default handleCheckboxChange;