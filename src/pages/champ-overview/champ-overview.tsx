import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"

import { ChampOverviewDataTable } from "~/pages/champ-overview/components/data-table"
import { champOverviewPageLoader } from "./champ-overview-page-loader"
import { columns } from "./components/columns"

export const ChampOverview = () => {
	const champions = createAsync(() => champOverviewPageLoader())

	return (
		<div>
			<Suspense>
				{champions() && <ChampOverviewDataTable data={champions() || []} columns={columns as any} />}
			</Suspense>
		</div>
	)
}
