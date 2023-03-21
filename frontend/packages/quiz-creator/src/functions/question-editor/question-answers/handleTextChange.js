/**
 * question-answers/handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into answer textarea
 */
// Functions
import modifyQuestion from '../modifyQuestion'

export function handleTextChange(event, activeAnswer, activeQuestion, questions, setQuestions) {
    let modifiedQuestion = activeQuestion;
    let modifiedAnswer = activeAnswer;
    let index = modifiedQuestion.potentialAnswers.findIndex((answer) => answer.id === modifiedAnswer.id)
    modifiedAnswer.text = event.target.value;
    modifiedQuestion.potentialAnswers[index] = modifiedAnswer
    modifyQuestion(modifiedQuestion, questions, setQuestions);
}
