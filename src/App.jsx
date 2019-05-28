import React, { Component } from "react";
import SocketIO from "socket.io-client";
import PropTypes from "prop-types";
import uuid from "uuid/v4";
// import update from "immutability-helper";

import { withCookies, Cookies } from "react-cookie";

import "./App.css";

import ScreenContainer from "./Screen/ScreenContainer";
import ServerSelectContainer from "./ServerSelect/ServerSelectContainer";
import StatusBar from "./StatusBar/StatusBar";
import Input from "./Input/Input";
import logo from "./logo.png";

import toAnsi from "./util/toAnsi";

const socketURL = process.env.REACT_APP_SOCKET_URL ? process.env.REACT_APP_SOCKET_URL : "ws://localhost:8080";

class App extends Component {
    static propTypes = {
        cookies: PropTypes.instanceOf(Cookies).isRequired
    };

    state = {
        buffer: [],
        servers: [],
        status: "closed",
        echo: true,
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
        socket.on("clientData", data => this.onData(data));
        socket.on("clientControl", event => this.onControl(event));
        socket.on("backLog", data => this.onBackLog(data));
        socket.on("status", ({ status, data }) => this.onStatus(status, data));
        socket.on("servers", servers => this.onServers(servers));
        socket.on("echo", echo => this.setState({echo}));
        socket.on("GMCP", ([command, data]) => this.onGMCP(command, data));
        this.socket = socket;
    }

    onBackLog(data) {
        const buffer = data.map(message => toAnsi(message));
        this.setState({ buffer });
    }

    onData(data) {
        this.setState(oldState => ({
            buffer: [...oldState.buffer, toAnsi(data)]
        }));
    }

    onServers(servers) {
        console.log("onServers", servers);
        this.setState({ servers });
    }

    onStatus(status, statusData) {
        console.log("onStatus", status, statusData);
        this.setState({ status, statusData });
    }

    onGMCP(command, data) {
        console.log("onGMCP", command, data);
        this;
    }

    connectServer(name) {
        console.log("connectServer", name, this.state.status);
        if (this.state.status === "connect") {
            this.socket.emit("disconnectServer", name);
            return;
        }
        this.socket.emit("connectServer", name);
    }

    sendMessage(message) {
        if (this.state.echo) {
            this.setState(oldState => ({
                buffer: [...oldState.buffer, toAnsi(`\r\n${message}\r\n`)]
            }));
        }
        this.socket.emit("send", { clientId: this.state.clientId, message: `${message}\r\n` });
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
                            status={this.state.status}
                        />
                    )}
                    <StatusBar status={this.state.status} statusData={this.state.statusData} />
                </header>
                <ScreenContainer buffer={this.state.buffer} />
                <Input sendMessage={message => this.sendMessage(message)} echo={this.state.echo} />
            </div>
        );
    }
}

export default withCookies(App);
