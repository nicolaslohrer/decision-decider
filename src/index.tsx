/** @jsx jsx */
import { jsx } from "@emotion/core";
import "core-js/fn/array/fill";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

jsx; // FIXME: This is no long-term solution. https://bit.ly/2S4Xj06

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
