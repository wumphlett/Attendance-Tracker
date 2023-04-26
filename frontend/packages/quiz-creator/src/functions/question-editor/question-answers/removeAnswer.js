/**
 * removeAnswer.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Remove a given answer from a given question
 */

import axios from 'axios';

export function removeAnswer(activeAnswer, activeQuestion, setActiveQuestion) {
    axios.delete(`answers/${activeAnswer.id}/`).then((r) => {
        let index = activeQuestion.answer_set.findIndex((answer) => answer.id === activeAnswer.id)
        activeQuestion.answer_set.splice(index, 1)
        setActiveQuestion(activeQuestion);
    });
}