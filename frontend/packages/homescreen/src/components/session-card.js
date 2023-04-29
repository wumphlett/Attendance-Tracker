/**
 * session-card.js
 *
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 26 APR 23
 *
 * Display information about session
 */
// Main
import React from "react";
import axios from "axios";
import fileDownload from 'js-file-download';
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class SessionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            time: props.time,
            id: props.id
        }
        this.getPresentationSessions = props.getPresentationSessions
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps !== prevState) {
            return nextProps;
        }
    }

    deleteSession = () => {
        axios.delete(`/sessions/${this.state.id}/`).then((res) => {
            this.getPresentationSessions();
        })
    }

    exportResults = (event) => {
        event.stopPropagation();
        axios({
            url: `/sessions/${this.state.id}/export/?geolocate=True`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            fileDownload(response.data, response.headers['content-disposition'].split('"')[1]);
        });
    }

    render() {
        return (
            <div className={"card session-card secondary-dark-theme text-dark-theme p-2 mb-2"}>
                <div className={"quiz-info col-6"}>
                    <div className={"col-6"}>
                        <span><strong>Date: </strong>{this.state.date}</span>
                    </div>
                    <div className={"col-6"}>
                        <span><strong>Time: </strong>{this.state.time}</span>
                    </div>
                </div>
                <div className={"col-6"}>
                    <div className={"session-options"}>
                        <button className={"btn btn-danger mb-0 ms-1"} onClick={
                            () => { this.deleteSession() }
                        }>Delete</button>
                        <button className={"btn btn-success mb-0 mx-1"} onClick={this.exportResults}>Export</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default SessionCard