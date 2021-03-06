const TELNET = {
    ECHO: 1,
    SUPPRESSGOAHEAD: 3,
    STATUS: 5,
    TIMINGMARK: 6,
    TERMINALTYPE: 24,
    NEGOTIATEWINDOWSIZE: 31,
    TERMINALSPEED: 32,
    REMOTEFLOWCONTROL: 33,
    LINEMODE: 34,
    ENVIRONMENTVARIABLES: 36,
    AUTHENTICATION: 37,
    ENCRYPTIONOPTION: 38,
    NEWENVIRONMENT: 39,
    TN3270E: 40,
    XAUTH: 41,
    CHARSET: 42,
    RSP: 43,
    COMPORTCONTROL: 44,
    TELNETSUPPRESSLOCALECHO: 45,
    TELNETSTARTTLS: 46,
    KERMIT: 47,
    SENDURL: 48,
    FORWARDX: 49,
    TELOPTPRAGMALOGON: 138,
    TELOPTSSPILOGON: 139,
    TELOPTPRAGMAHEARTBEAT: 140,
    GMCP: 201,
    SE: 240,
    NOP: 241,
    DATAMARK: 242,
    BREAK: 243,
    INTERRUPT: 244,
    ABORT: 245,
    AREYOUTHERE: 246,
    ERASECHAR: 247,
    ERASELINE: 248,
    GOAHEAD: 249,
    SB: 250,
    WILL: 251,
    WONT: 252,
    DO: 253,
    DONT: 254,
    IAC: 255
};

Object.keys(TELNET).forEach((key) => {
    TELNET[TELNET[key]] = key
});

function ppt(key) {
    return TELNET[key] !== null ? TELNET[key] : key
}

export default TELNET;
export { ppt };