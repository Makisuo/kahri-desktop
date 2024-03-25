import { createAsync } from "@solidjs/router"
import { Suspense } from "solid-js"

import * as Table from "~/components/ui/table"
import { champOverviewPageLoader } from "./champ-overview-page-loader"

export const ChampOverview = (props: any) => {
	const champions = createAsync(() => champOverviewPageLoader())

	return (
		<div>
			<Suspense>
				<Table.Root {...props}>
					<Table.Caption>Product Inventory</Table.Caption>
					<Table.Head>
						<Table.Row>
							<Table.Header>ID</Table.Header>
							<Table.Header>Name</Table.Header>
							<Table.Header>Stock</Table.Header>
							<Table.Header>Price</Table.Header>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{champions()?.map((champion) => (
							<Table.Row>
								<Table.Cell>{champion.id}</Table.Cell>
								<Table.Cell>{champion.name}</Table.Cell>
								<Table.Cell>{champion.blurb}</Table.Cell>
								<Table.Cell>{champion.name}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.Cell colSpan={2}>Totals</Table.Cell>
							<Table.Cell>87</Table.Cell>
							<Table.Cell>$34,163.00</Table.Cell>
						</Table.Row>
					</Table.Footer>
				</Table.Root>
			</Suspense>
		</div>
	)
}
