import type { Table } from "@tanstack/solid-table"

import { TbAdjustments, TbCheck } from "solid-icons/tb"
import * as Menu from "~/components/ui/menu"
import { Button } from "../button"

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
	return (
		<Menu.Root class={"w-min"}>
			<Menu.Trigger as={Button} variant="outline" size="xs" class="hidden w-min lg:flex">
				<TbAdjustments class="mr-2 h-4 w-4" />
				View
			</Menu.Trigger>
			<Menu.Positioner class="w-[150px]">
				<Menu.Content>
					<Menu.ItemGroup id="toggle-gorup">
						<Menu.ItemGroupLabel for="toggle-gorup">Toggle columns</Menu.ItemGroupLabel>
						{table
							.getAllColumns()
							.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
							.map((column) => {
								return (
									<Menu.Item
										class="capitalize"
										id={column.id}
										onClick={() => column.toggleVisibility()}
									>
										{column.getIsVisible() ? (
											<TbCheck class="mr-2 size-4 text-accent-emphasized" />
										) : (
											<div class="mr-2 size-4" />
										)}
										{column.id}
									</Menu.Item>
								)
							})}
					</Menu.ItemGroup>
				</Menu.Content>
			</Menu.Positioner>
		</Menu.Root>
	)
}
