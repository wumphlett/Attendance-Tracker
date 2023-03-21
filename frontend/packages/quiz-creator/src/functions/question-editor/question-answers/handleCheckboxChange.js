/**
 * /question-answers/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in an answer card, toggle where the respective answer is correct.
 */
// Functions
import modifyQuestion from '../modifyQuestion'

export function handleCheckboxChange(activeAnswer, checkboxState, activeQuestion, questions, setQuestions) {
    let modifiedQuestion = activeQuestion
    let index = modifiedQuestion.correctAnswers.findIndex((answer) => answer.id === activeAnswer.id)
    if (checkboxState === false) {
        if (index > -1) {
            modifiedQuestion.correctAnswers.splice(index, 1)
        }
    }
    else {
        if (index === -1) {
            modifiedQuestion.correctAnswers.push(activeAnswer)
        }
    }
    modifyQuestion(modifiedQuestion, questions, setQuestions)
}