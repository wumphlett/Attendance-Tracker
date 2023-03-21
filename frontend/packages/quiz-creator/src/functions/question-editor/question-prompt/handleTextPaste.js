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

function handleTextPaste(event, activeQuestion, questions, setQuestions) {
    // So create new prompt from combination of existing prompt and the pasted text
    event.preventDefault();
    const pastedText = event.clipboardData.getData('Text');
    const { selectionStart, selectionEnd } = event.target;
    const textBeforeSelection = activeQuestion.prompt.slice(0, selectionStart);
    const textAfterSelection = activeQuestion.prompt.slice(selectionEnd);
    const newText = textBeforeSelection + pastedText + textAfterSelection;

    // then assign that new prompt to the question object
    let questionToModify = activeQuestion;
    questionToModify.prompt = newText;
    modifyQuestion(questionToModify, questions, setQuestions);

    // finally, set the cursor position to end of pasted text
    event.target.value = activeQuestion.prompt
    const cursorPosition = selectionStart + pastedText.length;
    event.target.selectionStart = cursorPosition;
    event.target.selectionEnd = cursorPosition;
}

export default handleTextPaste;