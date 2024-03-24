/* @refresh reload */
import { render } from "solid-js/web"

import "@park-ui/tailwind-plugin/preset.css"
import "./styles.css"

import App from "./App"

render(() => <App />, document.getElementById("root") as HTMLElement)
