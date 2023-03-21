/**
 * removeAnswer.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Remove a given answer from a given question
 */
// Functions
import modifyQuestion from "../modifyQuestion";

export function removeAnswer(activeAnswer, activeQuestion, questions, setQuestions) {
    let modifiedQuestion = activeQuestion;
    // Remove from potential answers
    let index = modifiedQuestion.potentialAnswers.findIndex((answer) => answer.id = activeAnswer.id)
    modifiedQuestion.potentialAnswers.splice(index, 1)
    // Remove from correct answers
    index = modifiedQuestion.correctAnswers.findIndex((answer) => answer.id = activeAnswer.id)
    if (index > -1) {
        modifiedQuestion.correctAnswers.splice(index, 1)
    }
    modifyQuestion(modifiedQuestion, questions, setQuestions);
}