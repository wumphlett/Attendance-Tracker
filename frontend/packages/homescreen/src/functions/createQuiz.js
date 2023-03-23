/**
 * createQuiz.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 22 MAR 23
 *
 * Create a new quiz
 */

export function createQuiz(quizzes, setState) {
    let modifiedQuizzes = quizzes
    let newQuiz = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        title: "",
        questions: []
    }
    modifiedQuizzes.push(newQuiz)
    setState({ quizzes: modifiedQuizzes })
}