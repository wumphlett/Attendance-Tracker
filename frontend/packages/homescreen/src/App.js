import React from "react";
import Homescreen from "./pages/homescreen";


function App() {
    return (
        <div>
            {localStorage.getItem('access_token') === null ? (
                <div>
                    <h3>Redirecting to AUthenticate...</h3>
                </div>
            ) : (
                <Homescreen />
            )}
        </div>
    )
}

export default App;
