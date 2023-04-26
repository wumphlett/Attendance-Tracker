/**
 * handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into question prompt
 */

function handleTextChange(event, activeQuestion, setActiveQuestion) {
    activeQuestion.text = event.target.value;
    setActiveQuestion(activeQuestion)
}

export default handleTextChange;