import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Input.css";

const UP_ARROW = 38;
const DOWN_ARROW = 40;

class Input extends Component {
    state = { value: "" };
    history = [];
    cursor = 0;
    buffer = "";

    input = React.createRef();

    handleSubmit(event) {
        event.preventDefault();
        this.props.sendMessage(this.state.value);
        if (this.state.value === "") {
            return;
        }
        this.history = [...this.history, this.state.value];
        this.cursor = this.history.length;
        this.setState({ value: "" });
    }

    handleChange(event) {
        this.buffer = event.target.value;
        this.setState({ value: event.target.value });
    }

    updateValue() {
        const value = this.cursor === this.history.length ? this.buffer : this.history[this.cursor]
        this.setState({value});
        setTimeout(() => {
            this.input.current.setSelectionRange(0, value.length);
        }, 0);
        
    }

    handleKey(event) {
        switch (event.keyCode) {
            case UP_ARROW:
                this.cursor = Math.max(this.cursor - 1, 0);
                this.updateValue();
                event.preventDefault();
                break;
            case DOWN_ARROW:
                this.cursor = Math.min(this.cursor + 1, this.history.length);
                this.updateValue();
                event.preventDefault();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <input
                    autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                    className="InputBar"
                    type="text"
                    ref={this.input}
                    value={this.state.value}
                    onChange={event => this.handleChange(event)}
                    onKeyDown={event => this.handleKey(event)}
                />
            </form>
        );
    }
}

Input.propTypes = {
    sendMessage: PropTypes.func.isRequired
};

export default Input;
