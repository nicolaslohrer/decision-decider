/** @jsxImportSource @emotion/react */
import "react-app-polyfill/stable";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

serviceWorker.register();

// TODO: Cover basic usage scenarios with some tests.
// TODO: Fix sourcemap warning in chrome console.
