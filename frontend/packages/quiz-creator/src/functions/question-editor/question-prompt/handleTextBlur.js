/**
 * handleTextBlur.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Save the question when the user navigates away from the prompt
 */
// Functions
import modifyQuestion from '../modifyQuestion'
import axios from "axios"

function handleTextBlur(event, state) {
    event.preventDefault();
    axios.patch(`questions/${state.activeQuestion.id}/`, {
        text: state.activeQuestion.text,
        is_partial_allowed: state.activeQuestion.is_partial_allowed,
    }).then((r) => {
        console.log("Modifications saved.")
    });
}

export default handleTextBlur;