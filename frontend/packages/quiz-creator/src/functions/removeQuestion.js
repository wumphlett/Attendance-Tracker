/**
 * removeQuestion.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 21 MAR 23
 *
 * Remove a question from a quiz
 */

import axios from 'axios';

export function removeQuestion(questionToRemove, activeQuestion, setActiveQuestion, questions, setQuestions) {
    const index = questions.findIndex((question) => question.id === questionToRemove.id)
    const modifiedQuestions = questions.filter((question) => question.id !== questionToRemove.id)

    axios.delete(`questions/${questionToRemove.id}/`).then((r) => {
        setQuestions(modifiedQuestions)
        if (modifiedQuestions.length > 0) {
            if (questionToRemove === activeQuestion) {
                if (index === 0) {
                    setActiveQuestion(modifiedQuestions[0])
                } else {
                    setActiveQuestion(modifiedQuestions[index - 1])
                }
            }
        } else {
            setActiveQuestion(null)
        }
    });
}