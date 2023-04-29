import React from "react";
import Homescreen from "./pages/homescreen";
import { Redirect } from "@frontend/common/build";


function App() {
    return (
        <div>
            {localStorage.getItem('access_token') === null ? (
                <Redirect />
            ) : (
                <Homescreen />
            )}
        </div>
    )
}

export default App;
