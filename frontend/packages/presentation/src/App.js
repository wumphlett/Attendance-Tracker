import './App.css';
import './pages/presentation'
import Presentation from "./pages/presentation";
import React from "react";


function App() {
    return (
        <div>
            {localStorage.getItem('access_token') === null ? (
                <div>
                    <h3>Redirecting to AUthenticate...</h3>
                </div>
            ) : (
                <Presentation />
            )}
        </div>
    )
}

export default App;
