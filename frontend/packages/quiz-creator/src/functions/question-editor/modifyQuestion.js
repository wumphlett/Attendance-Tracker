/**
 * handleTextChange.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 20 MAR 23
 *
 * Create a new question within a quiz
 */

function modifyQuestion(questionToModify, questions, setQuestions) {
    let newQuestions = [...questions];
    const index = newQuestions.findIndex((question) => question.id === questionToModify.id);
    newQuestions[index] = questionToModify;
    setQuestions(newQuestions);
}

export default modifyQuestion;