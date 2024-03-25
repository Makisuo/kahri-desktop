/* @refresh reload */
import { render } from "solid-js/web"

import "@park-ui/tailwind-plugin/preset.css"
import "./styles.css"

import { Route, Router } from "@solidjs/router"
import { ChampOverview } from "./pages/champ-overview/champ-overview"
import { champOverviewPageLoader } from "./pages/champ-overview/champ-overview-page-loader"
import Home from "./pages/home"
import { RootLayout } from "./root-layout"

render(
	() => (
		<Router root={RootLayout}>
			<Route path="/" component={Home} />
			<Route path="/champ-overview" load={champOverviewPageLoader} component={ChampOverview} />
		</Router>
	),
	document.getElementById("root") as HTMLElement,
)
