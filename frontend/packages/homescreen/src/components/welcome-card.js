/**
 * welcome-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
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

        this.state = {
            user: this.props.user
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return { user: nextProps.user }
        }
    }

    render() {
        return (
            <div className={"card card-flex secondary-dark-theme"}>
                <div className={"card-body text-center"}>
                    <h2 className={"text-dark-theme user-select-none"}><strong>Welcome, {this.state.user.first_name + " " + this.state.user.last_name}</strong></h2>
                </div>
            </div>
        )
    }
}

export default WelcomeCard;