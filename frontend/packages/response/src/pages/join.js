/**
 * code-display.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Join a quiz with a code
 */
// Main
import React from "react";
// Components
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeInputValue: ''
        }
        this.inputRef = React.createRef();
    }

    handleInputChange = (event) => {
        const filteredText = event.target.value.replace(/[^a-zA-Z]/g, '');
        const capitalizedText = filteredText.toUpperCase();
        this.setState({ codeInputValue: capitalizedText }, () => {
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(capitalizedText.length, capitalizedText.length);
        });
    };

    render() {
        return (
            <div className={"card d-inline-block join-form-card secondary-dark-theme p-4"}>
                <form>
                    <div className={"d-flex justify-content-center flex-column align-self-center"}>
                        <div className={"card label-card primary-dark-theme pt-1 pb-0 px-3 text-center d-inline-block"}>
                            <h3 className={"text-dark-theme"}><strong>Join a Quiz</strong></h3>
                        </div>
                        <div className={"col-8 card code-entry-card mt-3 pb-0 px-3 text-center d-inline-block"}>
                            <input
                                className={"code-entry-input"}
                                type={"text"}
                                maxLength={5}
                                placeholder={"Enter a code..."}
                                value={this.state.codeInputValue}
                                key={this.state.codeInputValue}
                                ref={this.inputRef}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="card btn button-card join-button primary-dark-theme text-dark-theme mt-3 align-self-center">Join</div>
                    </div>
                </form>
            </div>
        )
    }
}

export default JoinForm