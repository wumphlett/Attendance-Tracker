import './App.css';
import './pages/presentation'
import Presentation from "./pages/presentation";
import { Redirect } from "@frontend/common/build"
import React from "react";


function App() {
    return (
        <div>
            {localStorage.getItem('access_token') === null ? (
                <Redirect />
            ) : (
                <Presentation />
            )}
        </div>
    )
}

export default App;
