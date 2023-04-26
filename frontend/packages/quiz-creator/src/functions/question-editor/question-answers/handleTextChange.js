/**
 * question-answers/handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert changed text into answer textarea
 */

export function handleTextChange(event, activeAnswer, activeQuestion, setActiveQuestion) {
  activeAnswer.text = event.target.value;
  setActiveQuestion(activeQuestion);
}
