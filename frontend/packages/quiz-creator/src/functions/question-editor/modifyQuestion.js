/**
 * handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Create a new question within a quiz
 */

import axios from 'axios';

function modifyQuestion(questionToModify, state, setCreatorState) {
    let newQuestions = [...state.questions];
    const index = newQuestions.findIndex((question) => question.id === questionToModify.id);
    axios.patch(`questions/${questionToModify.id}/`, {
        text: questionToModify.text,
        is_partial_allowed: questionToModify.is_partial_allowed,
    }).then((r) => {
        newQuestions[index] = questionToModify;
        setCreatorState({questions: newQuestions});
    });
}

export default modifyQuestion;