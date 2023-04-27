/**
 * session-list.js
 *
 * @Author - Ethan Brown
 * @Version - 26 APR 23
 *
 * List all sessions of a presentation
 */
// Main
import React from "react";
import axios from "axios";
// Components
import SessionCard from "./session-card";

// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class SessionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePresentation: props.activePresentation,
            sessions: []
        }
        this.setActivePresentation = props.setActivePresentation
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activePresentation !== prevProps.activePresentation && this.props.activePresentation !== null) {
            this.getPresentationSessions();
        }
    }

    getPresentationSessions = () => {
        axios.get(`/sessions/?presentation=${this.state.activePresentation.id}`)
            .then((res) => {
                if (res.data) {
                    this.setState({ sessions: res.data }, () => {
                        console.log(this.state.sessions)
                    })
                }
            })
    }

    getDate = (endTime) => {
        if (endTime) {
            let rawDate = endTime.split("T")[0]
            const year = rawDate.split("-")[0]
            const month = rawDate.split("-")[1]
            const day = rawDate.split("-")[2]
            return `${month}-${day}-${year}`
        } else {
            return "Ongoing"
        }
    }

    getTime = (endTime) => {
        if (endTime) {
            return endTime.split("T")[1].split(".")[0]
        } else {
            return "Ongoing"
        }
    }

    render() {
        return (
            <div className={"primary-dark-theme d-flex flex-column h-100 py-2 pe-2 overflow-auto"}>
                {this.state.activePresentation === null ? (<div></div>) : (
                    <div className={"card session-pane secondary-dark-theme h-100 w-100 p-2"}>
                        <button className={"btn btn-danger close-session-pane top-0 end-0 mt-2 me-2"}
                        onClick={() => { this.setActivePresentation(null) }}>X</button>
                        <div className={"d-flex flex-column justify-content-center align-self-center h-100 w-100"}>
                            <div className={"card primary-dark-theme pt-1 pb-0 px-3 mx-auto text-center d-inline-block"}>
                                <h3 className={"text-dark-theme user-select-none"}><strong>Sessions</strong></h3>
                            </div>
                            <div className={"d-flex flex-column h-100 w-100 overflow-auto"} style={{ flex: 1 }}>
                                <div className={"card primary-dark-theme d-flex flex-column mt-2 overflow-auto"} style={{ flex: 1 }}>
                                    <div className={"container-fluid quiz-list overflow-auto p-2"}>
                                        <div className={"d-inline-block pe-2"}>
                                            {this.state.sessions.map((session, index) => (
                                                <SessionCard
                                                    date={this.getDate(session.end_time)}
                                                    time={this.getTime(session.end_time)}
                                                    id={session.id}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default SessionList
