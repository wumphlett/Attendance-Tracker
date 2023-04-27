/**
 * session-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Display information about session
 */
// Main
import React from "react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class SessionCard extends React.Component {
    constructor(props) {
        super(props);
        this.date = props.date
        this.time = props.time
        this.id = props.id
    }

    render() {
        return (
            <div className={"card secondary-dark-theme text-dark-theme p-2 mb-2 w-100 d-flex flex-row align-items-center"}>
                <div className={"col-3"}>
                    <span><strong>Date: </strong>{this.date}</span>
                </div>
                <div className={"col-3"}>
                    <span><strong>Time: </strong>{this.time}</span>
                </div>
            </div>
        )
    }
}



export default SessionCard