/**
 * response.js
 *
 * @Author - Will Humphlett - wah0028@auburn.edu
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Respond to a quiz
 */
// Main
import React from "react";
import axios from "axios";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"
import { Navbar } from "@frontend/common/build"

class Response extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"primary-dark-theme"}>
                <Navbar />
                <div className={"content"}>
                    <div className={"p-2 h-100"}></div>
                </div>
            </div>
        )
    }
}

export default Response;