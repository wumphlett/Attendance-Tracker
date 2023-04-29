import React from "react"
import './App.css';
import QuizCreator from "./pages/quiz-creator";
import {Redirect} from "@frontend/common/build";


function App() {
  return (
    <div>
      {localStorage.getItem('access_token') === null ? (
        <Redirect />
      ) : (
        <QuizCreator/>
      )}
    </div>
  )
}

export default App;