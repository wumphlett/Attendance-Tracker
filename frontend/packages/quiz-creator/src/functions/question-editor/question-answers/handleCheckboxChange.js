/**
 * /question-answers/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in an answer card, toggle where the respective answer is correct.
 */

import axios from 'axios';

export function handleCheckboxChange(activeAnswer, checkboxState, activeQuestion, setActiveQuestion) {
  if (checkboxState) {
    if (!activeQuestion.is_multiple_selection_allowed) {
      activeQuestion.answer_set.map((answer) => {
        if (answer.is_correct) {
          axios.patch(`answers/${answer.id}/`, {
            is_correct: false
          }).then((r) => {
            answer.is_correct = false;
          });
        }
      })
    }
  }

  axios.patch(`answers/${activeAnswer.id}/`, {
    is_correct: checkboxState
  }).then((r) => {
    activeAnswer.is_correct = checkboxState;
    setActiveQuestion(activeQuestion)
  });
}