"use client"

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table"
import { TbArrowUp, TbChevronDown, TbDots } from "solid-icons/tb"
import { createSignal } from "solid-js"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"

import * as Menu from "~/components/ui/menu"

const data: Payment[] = [
	{
		id: "m5gr84i9",
		amount: 316,
		status: "success",
		email: "ken99@yahoo.com",
	},
	{
		id: "3u1reuv4",
		amount: 242,
		status: "success",
		email: "Abe45@gmail.com",
	},
	{
		id: "derv1ws0",
		amount: 837,
		status: "processing",
		email: "Monserrat44@gmail.com",
	},
	{
		id: "5kma53ae",
		amount: 874,
		status: "success",
		email: "Silas22@gmail.com",
	},
	{
		id: "bhqecj4p",
		amount: 721,
		status: "failed",
		email: "carmella@hotmail.com",
	},
]

export type Payment = {
	id: string
	amount: number
	status: "pending" | "processing" | "success" | "failed"
	email: string
}

export const columns: ColumnDef<Payment>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => <div class="capitalize">{row.getValue("status")}</div>,
	},
	{
		accessorKey: "email",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Email
					<TbArrowUp class="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div class="lowercase">{row.getValue("email")}</div>,
	},
	{
		accessorKey: "amount",
		header: () => <div class="text-right">Amount</div>,
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("amount"))

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)

			return <div class="text-right font-medium">{formatted}</div>
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original

			return (
				<Menu.Root>
					<Menu.Trigger>
						<Button variant="ghost" class="h-8 w-8 p-0">
							<span class="sr-only">Open menu</span>
							<TbDots class="h-4 w-4" />
						</Button>
					</Menu.Trigger>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.ItemGroup></Menu.ItemGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</Menu.Content>
					</Menu.Positioner>
				</Menu.Root>
			)
		},
	},
]

export function DataTableDemo() {
	const [sorting, setSorting] = createSignal<SortingState>([])
	const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>([])
	const [rowSelection, setRowSelection] = createSignal({})

	const table = createSolidTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			get columnFilters() {
				return columnFilters()
			},
			get sorting() {
				return sorting()
			},
			get rowSelection() {
				return rowSelection()
			},
		},
	})

	return (
		<div class="w-full">
			<div class="flex items-center py-4">
				<Input
					placeholder="Filter emails..."
					value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
					class="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" class="ml-auto">
							Columns <TbChevronDown class="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										class="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								)
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div class="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} class="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div class="flex items-center justify-end space-x-2 py-4">
				<div class="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
					row(s) selected.
				</div>
				<div class="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	)
}
