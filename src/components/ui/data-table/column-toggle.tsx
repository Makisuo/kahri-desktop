"use client"

import type { Table } from "@tanstack/solid-table"

import { TbAdjustments, TbCheck } from "solid-icons/tb"
import * as Select from "~/components/ui/select"
import { Button } from "../button"

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
	return (
		<Select.Root items={table.getAllColumns()} multiple>
			<Select.Trigger>
				<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex">
					<TbAdjustments class="mr-2 h-4 w-4" />
					View
				</Button>
			</Select.Trigger>
			<Select.Positioner class="w-[150px]">
				<Select.Content>
					<Select.ItemGroup id="toggle-gorup">
						<Select.ItemGroupLabel for="toggle-gorup">Toggle columns</Select.ItemGroupLabel>
						{table
							.getAllColumns()
							.filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
							.map((column) => {
								return (
									<Select.Item
										class="capitalize"
										id={column.id}
										item={column}
										onSelect={() => column.toggleVisibility(!!column.getIsVisible())}
									>
										<Select.ItemText>{column.id}</Select.ItemText>
										<Select.ItemIndicator>
											<TbCheck />
										</Select.ItemIndicator>
									</Select.Item>
								)
							})}
					</Select.ItemGroup>
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	)
}
