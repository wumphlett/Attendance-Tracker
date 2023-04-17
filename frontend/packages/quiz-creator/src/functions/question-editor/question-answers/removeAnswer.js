/**
 * removeAnswer.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Remove a given answer from a given question
 */

import axios from 'axios';

// Functions
import modifyQuestion from "../modifyQuestion";

export function removeAnswer(activeAnswer, activeQuestion, questions, setCreatorState) {
    axios.delete(`answers/${activeAnswer.id}/`).then((r) => {
        let modifiedQuestion = activeQuestion;
        // Remove from potential answers
        let index = modifiedQuestion.answer_set.findIndex((answer) => answer.id === activeAnswer.id)
        modifiedQuestion.answer_set.splice(index, 1)
        modifyQuestion(modifiedQuestion, {questions: questions}, setCreatorState);
    });
}