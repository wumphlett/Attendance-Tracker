/**
 * /question-answers/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in an answer card, toggle where the respective answer is correct.
 */

import axios from 'axios';

// Functions
import modifyQuestion from '../modifyQuestion'

export function handleCheckboxChange(activeAnswer, checkboxState, activeQuestion, questions, setCreatorState) {
    let modifiedQuestion = activeQuestion
    if (checkboxState) {
        if (activeQuestion.isMultipleSelectionAllowed === undefined || activeQuestion.isMultipleSelectionAllowed === false) {
            modifiedQuestion.answer_set.map((answer) => {
                axios.patch(`answers/${answer.id}/`, {
                    is_correct: false
                }).then((r) => {
                    answer.is_correct = false;
                });
            })
        }
    }
    axios.patch(`answers/${activeAnswer.id}/`, {
        is_correct: checkboxState
    }).then((r) => {
        activeAnswer.is_correct = checkboxState;
        modifyQuestion(modifiedQuestion, {questions: questions}, setCreatorState)
    });
}