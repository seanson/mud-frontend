import React from "react";
import PropTypes from "prop-types";

import "./Screen.css";

const getStyle = context => ({
    fontFamily: context.fontFamily,
    fontSize: context.fontSize
});

const Screen = (props, context) => (
    <div className="Screen" style={getStyle(context)} ref={props.screenRef}>
        <p>{props.buffer}</p>
    </div>
);

Screen.propTypes = {
    buffer: PropTypes.arrayOf(PropTypes.node).isRequired,
    screenRef: PropTypes.shape({ value: PropTypes.instanceOf(HTMLDivElement) }).isRequired
};

export default Screen;
