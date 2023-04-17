/**
 * counter-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Count the number of students currently active in a session
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/presentation.css"

class CounterCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"card label-card primary-dark-theme col-12 pt-1 pb-0 px-3 text-center d-inline-block"}>
                <h3 className={"text-dark-theme"}><strong>Join this Quiz</strong></h3>
            </div>
        )
    }
}

export default CounterCard;