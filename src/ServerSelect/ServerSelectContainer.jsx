import React from "react";
import PropTypes from "prop-types";

import ServerSelect from "./ServerSelect";

class ServerSelectContainer extends React.Component {
    state = {
        selectedServer: ''
    };


    onServerConnect(event) {
        console.log("onServerConnect", event);
        if (this.state.selectedServer) {
            this.props.onServerConnect(this.state.selectedServer);    
            return;
        }
        this.props.onServerConnect(this.props.servers[0].name);
    }

    onServerSelect(event) {
        console.log('onServerSelect', event.target.value);
        this.setState({
            selectedServer: event.target.value
        })
    }

    render() {
        return (
            <ServerSelect
                serverConnect={(event) => this.onServerConnect(event)}
                serverSelect={(event) => this.onServerSelect(event)}
                status={this.props.status}
                servers={this.props.servers}
            />
        );
    }
}
ServerSelectContainer.propTypes = {
    servers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            host: PropTypes.string.isRequired,
            port: PropTypes.number.isRequired
        })
    ).isRequired,
    onServerConnect: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
};

export default ServerSelectContainer;
