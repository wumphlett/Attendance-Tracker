import './App.css';
import React from "react";
import Response from "./pages/response";
import { Redirect } from "@frontend/common/build";


function App() {
  if (localStorage.getItem('access_token') === null) {
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get("access") === null) {
      window.location.href = `https://api.auttend.com/accounts/login?next=${window.location.href}`;
    } else {
      localStorage.setItem('access_token', queryParams.get("access"));
      localStorage.setItem('refresh_token', queryParams.get("refresh"));
      window.location.href = '/response/'
    }
  }
  return (
      <div>
        {localStorage.getItem('access_token') === null ? (
            <Redirect />
        ) : (
            <div>
              <Response />
            </div>
        )}
      </div>
  )
}

export default App;

