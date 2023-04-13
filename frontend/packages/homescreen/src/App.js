import React from "react";
import Homescreen from "./pages/homescreen";


function App() {
    if (localStorage.getItem('access_token') === null) {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.get("access") === null) {
            window.location.href = 'https://api.auttend.com/accounts/login';
        } else {
            localStorage.setItem('access_token', queryParams.get("access"));
            localStorage.setItem('refresh_token', queryParams.get("refresh"));
            window.location.href = '/'
        }
    }
    return (
        <div>
            <Homescreen />
        </div>
    )
}

export default App;
