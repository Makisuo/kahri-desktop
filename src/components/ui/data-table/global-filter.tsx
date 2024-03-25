import type { Table } from "@tanstack/solid-table"
import { createSignal } from "solid-js"
import { Input } from "../input"

interface GlobalFilterProps<TData> {
	table: Table<TData>
}

export const GlobalFilter = <TData,>({ table }: GlobalFilterProps<TData>) => {
	const [filter, setFilter] = createSignal<string>()

	return (
		<div>
			<Input
				value={filter() ?? ""}
				onChange={(value) => setFilter(String(value))}
				placeholder="Search all columns..."
			/>
		</div>
	)
}
