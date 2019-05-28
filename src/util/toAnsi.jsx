import React from "react";

import uuid from "uuid/v4";
import Ansi from "ansi-to-react";

const toAnsi = message => <Ansi key={uuid()}>{`${message.toString()}`}</Ansi>;
export default toAnsi;
