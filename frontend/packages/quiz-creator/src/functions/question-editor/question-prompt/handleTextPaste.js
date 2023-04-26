/**
 * handleTextPaste.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Insert pasted text into question prompt
 */

function handleTextPaste(event, activeQuestion, setActiveQuestion) {
    // So create new prompt from combination of existing prompt and the pasted text
    event.preventDefault();
    const pastedText = event.clipboardData.getData('Text');
    const { selectionStart, selectionEnd } = event.target;
    const textBeforeSelection = activeQuestion.text.slice(0, selectionStart);
    const textAfterSelection = activeQuestion.text.slice(selectionEnd);
    // then assign that new prompt to the question object
    activeQuestion.text = textBeforeSelection + pastedText + textAfterSelection;
    setActiveQuestion(activeQuestion)

    // finally, set the cursor position to end of pasted text
    event.target.value = activeQuestion.text
    const cursorPosition = selectionStart + pastedText.length;
    event.target.selectionStart = cursorPosition;
    event.target.selectionEnd = cursorPosition;
}

export default handleTextPaste;