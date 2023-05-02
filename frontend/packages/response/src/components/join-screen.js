/**
 * join-screen.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Join a quiz with a code
 */
// Main
import React from "react";
// Components
import CodeEntry from "./code-entry";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class JoinScreen extends React.Component {
    constructor(props) {
        super(props);
        this.joinAsResponder = props.joinAsResponder;
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <CodeEntry
                    joinAsResponder={this.joinAsResponder}
                />
                <div className={"card label-card secondary-dark-theme text-dark-theme pt-1 pb-0 px-3 text-center d-inline-block"}>
                    <h3><strong>
                        <a href={"https://prof.autend.com"} style={{ color: "floralwhite" }}>Create a Presentation</a>
                    </strong></h3>
                </div>
            </div>
        )
    }
}

export default JoinScreen