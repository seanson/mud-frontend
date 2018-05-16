import React from "react";
import PropTypes from "prop-types";

const ServerSelect = props => {
    const servers = props.servers.map(({ host, port, name }) => (
        <option key={name} value={name}>
            {name} - {host}:{port}
        </option>
    ));
    return (
        <div className="serverSelect">
            <select name="server" onChange={props.serverSelect}>{servers}</select>
            <input type="submit" onClick={props.serverConnect} value="Connect" />
        </div>
    );
};

ServerSelect.propTypes = {
    servers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            host: PropTypes.string.isRequired,
            port: PropTypes.number.isRequired
        })
    ).isRequired,
    serverSelect: PropTypes.func.isRequired,
    serverConnect: PropTypes.func.isRequired
};

export default ServerSelect;
