/**
 * checkbox.js
 *
 * @Author - Ethan Brown - ewb0020@auburn.edu
 * @Version - 22 FEB 23
 *
 * Checkbox component for use in question-options.js
 */
// Main
import React, { Component } from 'react'
// Components

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../stylesheets/global/interactables.css'

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = { isChecked: props.isChecked };
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isChecked !== this.props.isChecked) {
            this.setState({ isChecked: this.props.isChecked });
        }
    }


    toggleCheckbox(event) {
        const { handler , label} = this.props
        this.setState({isChecked: event.target.checked }, () => {
            handler(label, this.state.isChecked);
        });
    }

    render() {
        const { label } = this.props
        const { isChecked } = this.state
        return (
            <div className="checkbox">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckbox}
                        className={`checkbox-dark ${isChecked ? 'checked' : ''}`}
                        />
                    {label}
                </label>
            </div>
        )
    }
}

export default Checkbox;