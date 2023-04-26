import React from "react"
import './App.css';
import QuizCreator from "./pages/quiz-creator";


function App() {
  return (
    <div>
      {localStorage.getItem('access_token') === null ? (
        <div>
          <h3>Redirecting to AUthenticate...</h3>
        </div>
      ) : (
        <QuizCreator/>
      )}
    </div>
  )
}

export default App;