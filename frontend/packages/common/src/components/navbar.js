import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/navbar.css'

class Navbar extends React.Component {
    render() {
        const logo  = this.props.logo
        return (
            <nav className="nav navbar-dark fixed-top">
                <div className="d-flex flex-row align-items-center p-2 mr-auto">
                    <a className="navbar-brand" href="/">
                        <img src={logo} height="40"/>
                    </a>
                    <a className="nav-link pb-2" href="/">
                        <span className={"fa fa-home fa-lg"}></span>
                        Home
                    </a>
                </div>
            </nav>
        )
    }
}

export default Navbar