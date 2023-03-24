/**
 * deleteQuiz.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 23 MAR 23
 *
 * Delete a quiz
 */

export function deleteQuiz(quizToRemove, quizzes, setState) {
    let modifiedQuizzes = quizzes.filter((quiz) => quiz.id !== quizToRemove.id)
    setState({ user: { quizzes: modifiedQuizzes }})
}