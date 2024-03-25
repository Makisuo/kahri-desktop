import {
	type ColumnDef,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table"
import { createSignal } from "solid-js"
import { DataTableViewOptions } from "~/components/ui/data-table/column-toggle"
import { Input } from "~/components/ui/input"

import * as Table from "~/components/ui/table"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function ChampOverviewDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [globalFilter, setGlobalFilter] = createSignal<string>()

	const table = createSolidTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		globalFilterFn: "includesString",
		state: {
			get globalFilter() {
				return globalFilter()
			},
		},
	})

	return (
		<div class="space-y-3">
			<div class="flex w-full flex-row justify-between">
				<div>
					<Input
						value={globalFilter() ?? ""}
						onInput={(value) => setGlobalFilter(String(value.target.value))}
						placeholder="Search all columns..."
					/>
				</div>
				<DataTableViewOptions table={table} />
			</div>
			<div class="overflow-scroll rounded-md border">
				<Table.Root>
					<Table.Head>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Row id={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Table.Header id={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</Table.Header>
									)
								})}
							</Table.Row>
						))}
					</Table.Head>
					<Table.Body>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Table.Row id={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<Table.Cell id={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</Table.Cell>
									))}
								</Table.Row>
							))
						) : (
							<Table.Row>
								<Table.Cell colSpan={columns.length} class="h-24 text-center">
									No results.
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	)
}
