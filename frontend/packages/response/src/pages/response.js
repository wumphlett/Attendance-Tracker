/**
 * response.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Respond to a quiz
 */
// Main
import React from "react";
import axios from "axios";
// Components
import { Navbar } from "@frontend/common/build"
import JoinForm from "./join";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"
import Join from "./join";

class Response extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {/* Join Code */}
                        <div className={"h-100 d-flex align-self-center justify-content-center"}>
                            <JoinForm />
                        </div>
                        {/* Response Form */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;