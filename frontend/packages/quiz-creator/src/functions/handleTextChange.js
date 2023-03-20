/**
 * handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into question prompt
 */
// Functions
import modifyQuestion from './modifyQuestion'

function handleTextChange(event, activeQuestion, questions, setQuestions) {
    let questionToModify = activeQuestion;
    questionToModify.prompt = event.target.value;
    modifyQuestion(questionToModify, questions, setQuestions);
}

export default handleTextChange;