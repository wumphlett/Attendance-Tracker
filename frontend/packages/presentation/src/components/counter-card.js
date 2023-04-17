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
        this.state = {
            currentlyJoined: props.currentlyJoined,
            classSize: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return { currentlyJoined: nextProps.currentlyJoined }
        }
    }

    render() {
        return (
            <div className={"card label-card secondary-dark-theme pt-1 pb-0 px-3 text-center d-inline-block"}>
                <h3 className={"text-dark-theme"}><strong>Currently Joined: {this.state.currentlyJoined}</strong></h3>
            </div>
        )
    }
}

export default CounterCard;