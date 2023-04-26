export function handleTextPaste(event, activeAnswer, activeQuestion, setActiveQuestion) {
    // So create new prompt from combination of existing prompt and the pasted text
    event.preventDefault();
    const pastedText = event.clipboardData.getData('Text');
    const { selectionStart, selectionEnd } = event.target;
    const textBeforeSelection = activeAnswer.text.slice(0, selectionStart);
    const textAfterSelection = activeAnswer.text.slice(selectionEnd);
    // then assign that new prompt to the question object
    activeAnswer.text = textBeforeSelection + pastedText + textAfterSelection;
    setActiveQuestion(activeQuestion)

    // finally, set the cursor position to end of pasted text
    event.target.value = activeAnswer.text
    const cursorPosition = selectionStart + pastedText.length;
    event.target.selectionStart = cursorPosition;
    event.target.selectionEnd = cursorPosition;
}
