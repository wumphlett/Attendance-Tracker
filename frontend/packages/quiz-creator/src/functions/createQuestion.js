/**
 * createQuestion.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 19 MAR 23
 *
 * Create a new question within a quiz
 */

import axios from 'axios';

export function createQuestion(presentationId, questions, setQuestions, setActiveQuestion) {
  axios.post("questions/", {
    presentation: presentationId,
    index: questions.length,
    text: "A Blank Question",
    is_partial_allowed: false,
  }).then((r) => {
    questions.push(r.data)
    setQuestions(questions);
    if (questions.length === 1) {
      setActiveQuestion(questions[0]);
    }
  })
}

