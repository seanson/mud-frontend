import React, { Component } from "react";
import PropTypes from "prop-types";

import Screen from "./Screen";

class ScreenContainer extends Component {
    componentDidUpdate() {
        console.log("componentDidUpdate", "buffer length:", this.props.buffer.length);
        this.screen.current.scrollTop = this.screen.current.scrollHeight;
    }

    screen = React.createRef();

    render() {
        return <Screen buffer={this.props.buffer} screenRef={this.screen} />;
    }
}

ScreenContainer.propTypes = {
    buffer: PropTypes.arrayOf(PropTypes.node).isRequired
};

export default ScreenContainer;
