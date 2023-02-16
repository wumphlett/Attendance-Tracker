/**
 * Navbar.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 16 FEB 23
 *
 * Common navbar used across the webapp
 */
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/navbar.css'
import logo from '../../img/logo.png'

function Navbar() {
    return (
        <nav className="navbar nav navbar-dark navbar-expand-sm fixed-top">
            <div className="container align-self-center">
                <button className="navbar-toggler my-auto" type="button" data-bs-toggle="collapse"
                        data-bs-target="#Navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="./index.html"><img src={logo} height="40" /></a>
                <div className="collapse navbar-collapse" id="Navbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><a className="nav-link" href="./index.html"><span
                            className="fa fa-home fa-lg"></span> Home</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;