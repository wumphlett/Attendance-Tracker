/**
 * handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into question prompt
 */
// Functions
import modifyQuestion from '../modifyQuestion'

function handleTextChange(event, state, setCreatorState) {
    let questionToModify = state.activeQuestion;
    questionToModify.text = event.target.value;
    modifyQuestion(questionToModify, state, setCreatorState);
}

export default handleTextChange;