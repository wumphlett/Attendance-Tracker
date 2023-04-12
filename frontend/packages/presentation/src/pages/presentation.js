/**
 * presentation.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 12 APR 23
 *
 * Present a quiz
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "../stylesheets/presentation.css"

class Presentation extends React.Component {
    constructor(props) {
        super(props);
    }

   render() {
        return (
            <div className={"primary-dark-theme"}>
                <h1>Hello, world!</h1>
            </div>
        )
   }
}

export default Presentation