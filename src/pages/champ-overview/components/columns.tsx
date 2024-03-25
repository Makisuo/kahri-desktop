import { createColumnHelper } from "@tanstack/solid-table"
import type { Champion } from "~/lib/league-api/types"
import { DataTableColumnHeader } from "../../../components/ui/data-table/column-header"

const columnHelper = createColumnHelper<Champion>()

export const columns = [
	columnHelper.accessor("name", {
		id: "name",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Champion" />,
	}),
	columnHelper.accessor("stats.hp", {
		id: "hp",
		header: ({ column }) => <DataTableColumnHeader column={column} title="HP" />,
	}),
	// TODO: CHECK THIS
	columnHelper.accessor("stats.hpperlevel", {
		id: "hp@18",
		header: ({ column }) => <DataTableColumnHeader column={column} title="HP@18" />,
		cell: ({ getValue, cell }) => getValue() * 18 + cell.row.original.stats.hp,
	}),
	columnHelper.accessor("stats.mp", {
		id: "mana",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Mana" />,
	}),
	columnHelper.accessor("stats.mpperlevel", {
		id: "manaPerLevel",
		header: ({ column }) => <DataTableColumnHeader column={column} title="Mana Per Level" />,
	}),
	columnHelper.accessor("stats.attackdamage", {
		id: "ad",
		header: ({ column }) => <DataTableColumnHeader column={column} title="AD" />,
	}),
	columnHelper.accessor("stats.attackspeed", {
		id: "as",
		header: ({ column }) => <DataTableColumnHeader column={column} title="AS" />,
	}),
	columnHelper.accessor("stats.attackrange", {
		id: "ar",
		header: ({ column }) => <DataTableColumnHeader column={column} title="AR" />,
	}),
	columnHelper.accessor("stats.spellblock", {
		id: "mr",
		header: ({ column }) => <DataTableColumnHeader column={column} title="MR" />,
	}),
	columnHelper.accessor("stats.movespeed", {
		id: "ms",
		header: ({ column }) => <DataTableColumnHeader column={column} title="MS" />,
	}),
]
