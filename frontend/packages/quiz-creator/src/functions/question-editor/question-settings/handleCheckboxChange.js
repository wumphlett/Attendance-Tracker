/**
 * /question-settings/handleCheckboxChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * When a checkbox is toggled in question settings, change the respective property of the active question
 */
// Functions
import modifyQuestion from '../modifyQuestion'

function handleCheckboxChange(label, checkboxState, activeQuestion, questions, setQuestions) {
    if (label === "Enforce time limit") {
        let modifiedQuestion = activeQuestion
        modifiedQuestion.isTimeLimited = checkboxState
        modifyQuestion(modifiedQuestion, questions, setQuestions)
    }
    else if (label === "Allow partial credit") {
        let modifiedQuestion = activeQuestion
        modifiedQuestion.isPartialCreditAllowed = checkboxState
        modifyQuestion(modifiedQuestion, questions, setQuestions)
    }
    else if (label === "Allow multiple selection") {
        let modifiedQuestion = activeQuestion
        modifiedQuestion.isMultipleSelectionAllowed = checkboxState
        // If single selection is enforced and multiple answers are already marked as correct, unmark all answers
        if (checkboxState === false && activeQuestion.correctAnswers.length > 1) {
            modifiedQuestion.correctAnswers = []
        }
        modifyQuestion(modifiedQuestion, questions, setQuestions)
    }
}

export default handleCheckboxChange;