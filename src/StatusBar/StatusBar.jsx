import React from "react";
import PropTypes from "prop-types";
import "./StatusBar.css";

const getStatus = (status, statusData) => {
    // console.log(status, statusData);
    switch (status) {
        case "connecting":
            return {
                color: "yellow",
                status: "Connecting.."
            };
        case "error":
            return {
                color: "red",
                status: `Error: ${statusData.error}`
            };
        case "connect":
            return {
                color: "lightgreen",
                status: "Connected"
            };
        case "close":
            return {
                color: "red",
                status: "Disconnected"
            };
        default:
            return {
                color: "white",
                status
            };
    }
};

const Icon = ({ size = "1em", color = "currentColor", title, children }) => (
    <svg width={size} height={size} viewBox="0 0 32 32">
        <title>{title}</title>
        {children}
        <style jsx="true">
            {`
                svg {
                    vertical-align: middle;
                    fill: ${color};
                }
            `}
        </style>
    </svg>
);

Icon.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

Icon.defaultProps = {
    size: "1em",
    color: "currentColor"
};

const StatusBar = props => (
    <div>
        <span>
            <Icon
                title={getStatus(props.status, props.statusData).status}
                color={getStatus(props.status, props.statusData).color}
            >
                <circle cx="16" cy="16" r="16" />
            </Icon>
            {getStatus(props.status, props.statusData).status}
        </span>
    </div>
);

StatusBar.defaultProps = {
    statusData: {}
};
StatusBar.propTypes = {
    status: PropTypes.string.isRequired,
    statusData: PropTypes.shape({
        hadError: PropTypes.bool
    })
};

export default StatusBar;
