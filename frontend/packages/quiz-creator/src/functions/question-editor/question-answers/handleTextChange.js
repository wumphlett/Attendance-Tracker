/**
 * question-answers/handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into answer textarea
 */

import axios from 'axios';

// Functions
import modifyQuestion from '../modifyQuestion'

export function handleTextChange(event, activeAnswer, activeQuestion, questions, setCreatorState) {
    let modifiedQuestion = activeQuestion;
    let modifiedAnswer = activeAnswer;
    let text = event.target.value;
    axios.patch(`answers/${activeAnswer.id}/`, {
        text: text
    }).then((r) => {
        let index = modifiedQuestion.answer_set.findIndex((answer) => answer.id === modifiedAnswer.id)
        modifiedAnswer.text = text;
        modifiedQuestion.answer_set[index] = modifiedAnswer;
        modifyQuestion(modifiedQuestion, {questions: questions}, setCreatorState);
    });
}
