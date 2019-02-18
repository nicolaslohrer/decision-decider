/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import "core-js/fn/array/fill";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();

// TODO: Cover basic usage scenarios with some tests.
