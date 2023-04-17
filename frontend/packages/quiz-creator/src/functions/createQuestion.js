/**
 * createQuestion.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 19 MAR 23
 *
 * Create a new question within a quiz
 */

import axios from 'axios';

export function createQuestion(state, setCreatorState) {
    axios.post("questions/", {
        presentation: state.presentationId,
        index: state.questions.length,
        text: "A Blank Question",
        is_partial_allowed: false,
    }).then((r) => {
        const newQuestions = state.questions
        newQuestions.push(r.data)
        if (state.length === 1) {
            setCreatorState({questions: newQuestions, activeQuestion: state.questions[0]});
        } else {
            setCreatorState({questions: newQuestions});
        }
    })
}

