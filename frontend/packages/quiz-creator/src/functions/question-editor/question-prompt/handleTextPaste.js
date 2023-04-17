/**
 * handleTextPaste.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert pasted text into question prompt
 */
// Functions
import modifyQuestion from '../modifyQuestion'

function handleTextPaste(event, state, setCreatorState) {
    // So create new prompt from combination of existing prompt and the pasted text
    event.preventDefault();
    const pastedText = event.clipboardData.getData('Text');
    const { selectionStart, selectionEnd } = event.target;
    const textBeforeSelection = state.activeQuestion.text.slice(0, selectionStart);
    const textAfterSelection = state.activeQuestion.text.slice(selectionEnd);
    const newText = textBeforeSelection + pastedText + textAfterSelection;

    // then assign that new prompt to the question object
    let questionToModify = state.activeQuestion;
    questionToModify.text = newText;
    modifyQuestion(questionToModify, state, setCreatorState);

    // finally, set the cursor position to end of pasted text
    event.target.value = state.activeQuestion.text
    const cursorPosition = selectionStart + pastedText.length;
    event.target.selectionStart = cursorPosition;
    event.target.selectionEnd = cursorPosition;
}

export default handleTextPaste;