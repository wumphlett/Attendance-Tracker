/**
 * completion-screen.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Screen shown upon completion of a quiz
 */
// Main
import React from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class CompletionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.sessionId = props.sessionId
    }

    downloadCSV = (event) => {
        event.stopPropagation();
        axios({
            url: `/sessions/${this.sessionId}/export/?geolocate=True`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            fileDownload(response.data, response.headers['content-disposition'].split('"')[1]);
        });
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"col-12 col-md-8 h-100 mx-auto d-flex flex-column justify-content-center h-100"}>
                    <div className={"card secondary-dark-theme text-dark-theme py-3"}>
                        <h1 className="text-center user-select-none pb-0 pt-0"><strong>Quiz Complete</strong></h1>
                        <hr className={"quiz-complete-break mx-auto"} />
                        <div className={"card btn button-card primary-dark-theme text-dark-theme mx-auto w-50"}
                             onClick={this.downloadCSV}>
                            <h3><strong>Export Results</strong></h3>
                        </div>
                        <div className="card btn button-card primary-dark-theme text-dark-theme mx-auto mt-2 w-50"
                        onClick={() => {window.location.href = "/"}}>
                            <h3><strong>Return Home</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompletionScreen