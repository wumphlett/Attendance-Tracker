/**
 * completion-screen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Screen shown upon completion of a quiz
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class CompletionScreen extends React.Component {

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-8 h-100 mx-auto d-flex flex-column justify-content-center h-100"}>
                    <div className={"card secondary-dark-theme text-dark-theme py-3"}>
                        <h1 className="text-center pb-0 pt-0"><strong>Quiz Complete</strong></h1>
                        <hr className={"quiz-complete-break mx-auto"} />
                        <div className="card btn button-card primary-dark-theme text-dark-theme mx-auto mt-2 w-50"
                        onClick={() => {window.location.href = "/"}}>
                            <h3><strong>Take Another</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompletionScreen