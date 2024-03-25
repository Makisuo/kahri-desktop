import type { Column } from "@tanstack/solid-table"
import type { JSX } from "solid-js"
import { cn } from "tailwind-variants"
import { Button } from "../button"

import { TbArrowDown, TbArrowUp, TbCaretUp, TbEyeClosed } from "solid-icons/tb"
import * as Menu from "~/components/ui/menu"

interface DataTableColumnHeaderProps<TData, TValue> extends JSX.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	class: classes,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div class={classes}>{title}</div>
	}

	return (
		<div class={cn("flex items-center space-x-2", classes)({ twMerge: true })}>
			<Menu.Root>
				<Menu.Trigger>
					<Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
						<span>{title}</span>
						{column.getIsSorted() === "desc" ? (
							<TbArrowDown class="ml-2 h-4 w-4" />
						) : column.getIsSorted() === "asc" ? (
							<TbArrowUp class="ml-2 h-4 w-4" />
						) : (
							<TbCaretUp class="ml-2 h-4 w-4" />
						)}
					</Button>
				</Menu.Trigger>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item id="asc" onClick={() => column.toggleSorting(false)}>
							<TbArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Asc
						</Menu.Item>
						<Menu.Item id="desc" onClick={() => column.toggleSorting(true)}>
							<TbArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Desc
						</Menu.Item>
						<Menu.Item id="hide" onClick={() => column.toggleVisibility(false)}>
							<TbEyeClosed class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Hide
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Menu.Root>
		</div>
	)
}
