/* @refresh reload */
import { render } from "solid-js/web"

import "@park-ui/tailwind-plugin/preset.css"
import "./styles.css"

import { Route, Router } from "@solidjs/router"
import { ChampOverview } from "./pages/champ-overview/champ-overview"
import { champOverviewPageLoader } from "./pages/champ-overview/champ-overview-page-loader"
import { CraftingPage } from "./pages/crafting"
import Home from "./pages/home"
import { MasteryPage } from "./pages/mastery"
import { RandomChampPage } from "./pages/random-champ"
import { RootLayout } from "./root-layout"

render(
	() => (
		<Router root={RootLayout}>
			<Route path="/" component={Home} />
			<Route path="/mastery" component={MasteryPage} />
			<Route path="/random-champ" component={RandomChampPage} />
			<Route path="/champ-overview" load={champOverviewPageLoader} component={ChampOverview} />
			<Route path="/crafting" component={CraftingPage} />
		</Router>
	),
	document.getElementById("root") as HTMLElement,
)
