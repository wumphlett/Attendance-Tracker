/**
 * /question-settings/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in question settings, change the respective property of the active question
 */

import axios from 'axios';

function handleCheckboxChange(label, checkboxState, activeQuestion, setActiveQuestion) {
    if (label === "Enforce time limit") {
        activeQuestion.is_time_limited = checkboxState
    }
    else if (label === "Allow partial credit") {
        activeQuestion.is_partial_allowed = checkboxState
    }
    else if (label === "Allow multiple selection") {
        activeQuestion.is_multiple_selection_allowed = checkboxState
        // If single selection is enforced and multiple answers are already marked as correct, unmark all answers
        if (checkboxState === false && activeQuestion.answer_set.filter(answer => answer.is_correct).length > 1) {
            for (let answer of activeQuestion.answer_set) {  // TODO wrangle DRF to allow setting this through queryset
                if (answer.is_correct) {
                    answer.is_correct = false;
                    axios.patch(`answers/${answer.id}/`, {
                        is_correct: answer.is_correct,
                    }).then((r) => {

                    });
                }
            }
        }
    }

    axios.patch(`questions/${activeQuestion.id}/`, {
        is_partial_allowed: activeQuestion.is_partial_allowed,
    }).then((r) => {
        setActiveQuestion(activeQuestion)
    });
}

export default handleCheckboxChange;