/* @refresh reload */
import { render } from "solid-js/web"

import "@park-ui/tailwind-plugin/preset.css"
import "./styles.css"

import { Route, Router } from "@solidjs/router"
import Home from "./pages/Home"
import { RootLayout } from "./root-layout"

render(
	() => (
		<Router root={RootLayout}>
			<Route path="/" component={Home} />
		</Router>
	),
	document.getElementById("root") as HTMLElement,
)
