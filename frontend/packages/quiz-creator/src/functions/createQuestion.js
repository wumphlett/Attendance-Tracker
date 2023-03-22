/**
 * createQuestion.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 19 MAR 23
 *
 * Create a new question within a quiz
 */

export function createQuestion(questions, setQuestions, setActiveQuestion) {
    const newQuestion = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        prompt: "",
        image: "",
        potentialAnswers: [],
        correctAnswers: [],
        isTimeLimited: false,
        timeLimit: 0,
        isPartialCreditAllowed: false,
        isMultipleSelectionAllowed: false
    };
    const newQuestions = questions
    newQuestions.push(newQuestion)
    setQuestions(newQuestions);
    if (questions.length === 1) {
        setActiveQuestion(questions[0]);
    }
}

