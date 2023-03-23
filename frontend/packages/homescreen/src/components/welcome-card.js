/**
 * welcome-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 22 MAR 23
 *
 * Welcome the professor to AUttendance
 */
// Main
import React from "react";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class WelcomeCard extends React.Component {
    constructor(props) {
        super(props);
        this.prefix = props.prefix;
        this.lastname = props.lastname;
    }

    render() {
        return (
            <div className={"card card-flex secondary-dark-theme"}>
                <div className={"card-body text-center"}>
                    <h2 className={"text-dark-theme"}><strong>Welcome, {this.prefix + " " + this.lastname}</strong></h2>
                </div>
            </div>
        )
    }
}

export default WelcomeCard;