/**
 * createAnswer.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Create a new answer for a given question
 */

import axios from 'axios';

// Functions
import modifyQuestion from "../modifyQuestion";

export function createAnswer(activeQuestion, questions, setCreatorState) {
    axios.post("answers/", {
        question: activeQuestion.id,
        index: activeQuestion.answer_set.length,
        symbol: activeQuestion.answer_set.length.toString(),
        text: "A Blank Answer",
        is_correct: false,
    }).then((r) => {
        const modifiedQuestion = activeQuestion;
        modifiedQuestion.answer_set.push(r.data);
        modifyQuestion(modifiedQuestion, {questions: questions}, setCreatorState);
    })
}