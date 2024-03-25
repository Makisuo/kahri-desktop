"use client"

import { type ColumnDef, createSolidTable, flexRender, getCoreRowModel, getSortedRowModel } from "@tanstack/solid-table"
import { DataTableViewOptions } from "~/components/ui/data-table/column-toggle"

import * as Table from "~/components/ui/table"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function ChampOverviewDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = createSolidTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div class="space-y-3">
			<div class="flex w-full flex-row justify-between">
				<div />
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
