import React, { Component } from "react";
import SocketIO from "socket.io-client";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
import Ansi from "ansi-to-react";

import { withCookies, Cookies } from "react-cookie";

import "./App.css";

import ScreenContainer from "./Screen/ScreenContainer";
import ServerSelectContainer from "./ServerSelect/ServerSelectContainer";
import StatusBar from "./StatusBar/StatusBar";
import Input from "./Input/Input";
import logo from "./logo.png";

const socketURL = process.env.REACT_APP_SOCKET_URL ? process.env.REACT_APP_SOCKET_URL : "ws://localhost:8080";

class App extends Component {
    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    state = {
        buffer: [],
        servers: [],
        status: "closed",
        statusData: {}
    };

    componentDidMount() {
        this.id = this.props.cookies.get("id");
        if (!this.id) {
            this.id = uuid();
            this.props.cookies.set("id", this.id);
        }
        console.log("Client ID: ", this.id);

        const socket = new SocketIO(`${socketURL}?token=${this.id}`);
        socket.on("clientData", data => this.onMessage(data));
        socket.on("status", ({ status, data }) => this.onStatus(status, data));
        socket.on("servers", servers => this.onServers(servers));
        this.socket = socket;
    }

    onMessage(event) {
        // console.log("onMessage", event);
        this.setState(oldState => ({ buffer: [...oldState.buffer, <Ansi key={uuid()}>{`${event}\r\n`}</Ansi>] }));
    }

    onServers(servers) {
        console.log("onServers", servers);
        this.setState({ servers });
    }

    onStatus(status, statusData) {
        console.log("onStatus", status, statusData);
        // const { error } = data;
        // console.log(!!error);
        this.setState({ status, statusData });
    }

    connectServer(name) {
        console.log("connectServer", name);
        this.socket.emit("connectServer", name);
    }

    sendMessage(message) {
        console.log("sendMessage", message);
        this.setState(oldState => ({
            buffer: [...oldState.buffer, <Ansi key={uuid()}>{`\r\n${message}\r\n`}</Ansi>]
        }));
        this.socket.emit("send", { clientId: this.state.clientId, message });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {this.state.servers.length > 0 && (
                        <ServerSelectContainer
                            onServerConnect={server => this.connectServer(server)}
                            servers={this.state.servers}
                        />
                    )}
                    <StatusBar status={this.state.status} statusData={this.state.statusData} />
                </header>
                <ScreenContainer buffer={this.state.buffer} />
                <Input sendMessage={message => this.sendMessage(message)} />
            </div>
        );
    }
}

export default withCookies(App);
