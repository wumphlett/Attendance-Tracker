/**
 * createAnswer.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Create a new answer for a given question
 */
// Functions
import modifyQuestion from "../modifyQuestion";

export function createAnswer(activeQuestion, questions, setQuestions) {
    let modifiedQuestion = activeQuestion;
    let answer = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        text: "",
        isCorrect: true
    }
    modifiedQuestion.potentialAnswers.push(answer);
    modifyQuestion(modifiedQuestion, questions, setQuestions);
}