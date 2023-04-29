/**
 * redirect.js
 *
 * @Author - Ethan Brown
 * @Version - 28 APR 23
 *
 * Screen shown to users when they are being redirected to AUthenticate.
 */
// Main
import React from "react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"

class Redirect extends React.Component {
    render() {
        return (
            <div className={"text-center align-items-center pt-5"}>
                <h3>Redirecting to AUthenticate...</h3>
            </div>
        )
    }
}

export default Redirect