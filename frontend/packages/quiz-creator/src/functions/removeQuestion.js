/**
 * removeQuestion.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Remove a question from a quiz
 */

import axios from 'axios';

export function removeQuestion(questionToRemove, state, setCreatorState) {
    const index = state.questions.findIndex((question) => question.id === questionToRemove.id)
    const modifiedQuestions = state.questions.filter((question) => question.id !== questionToRemove.id)

    axios.delete(`questions/${questionToRemove.id}/`).then((r) => {
        modifiedQuestions.map((question, index) => {
            console.log(question, index);
            axios.patch(`questions/${question.id}/`, {index: index}).then((r) => {
                modifiedQuestions[index].index = r.data.index
            })
        })

        setCreatorState({questions: modifiedQuestions})
        if (modifiedQuestions.length > 0) {
            if (questionToRemove === state.activeQuestion) {
                if (index === 0) {
                    setCreatorState({activeQuestion: modifiedQuestions[0]})
                } else {
                    setCreatorState({activeQuestion: modifiedQuestions[index - 1]})
                }
            }
        } else {
            setCreatorState({activeQuestion: null})
        }
    });
}