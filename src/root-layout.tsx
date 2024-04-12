import { A } from "@solidjs/router"
import { TbAirBalloon, TbArrowsRandom, TbGizmo, TbHome, TbOctagon } from "solid-icons/tb"
import type { Component, JSX } from "solid-js"

import * as Drawer from "~/components/ui/drawer"

type RootLayoutProps = {
	children?: JSX.Element
}

const sections = [
	{
		name: "Main",
		items: [
			{
				name: "Home",
				href: "/",
				icon: TbHome,
			},
		],
	},
	{
		name: "Client Tools",
		items: [
			{
				name: "Mastery",
				href: "/mastery",
				icon: TbOctagon,
			},
			{
				name: "Random Champ",
				href: "/random-champ",
				icon: TbArrowsRandom,
			},
			{
				name: "Champion Overview",
				href: "/champ-overview",
				icon: TbAirBalloon,
			},
			{
				name: "Crafting",
				href: "/crafting",
				icon: TbGizmo,
			},
			{
				name: "Lobby Rooms",
				href: "/ingame-vc",
				icon: TbGizmo,
			},
		],
	},
]

export const RootLayout: Component<RootLayoutProps> = ({ children }) => {
	return (
		<div class="flex h-screen overflow-hidden border-border-default bg-bg-default text-fg-default">
			<Drawer.Root>
				<div class="hidden md:flex md:flex-shrink-0">
					<div class="flex w-64 flex-col">
						<div class="flex flex-grow flex-col overflow-y-auto border-r bg-bg-default pt-5">
							<div class="flex flex-shrink-0 flex-col px-4">
								<A
									class="font-semibold text-lg tracking-tighter focus:outline-none focus:ring"
									href="/"
								>
									<span class="inline-flex items-center gap-2">
										{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
										<svg
											class="mx-auto size-5"
											viewBox="0 0 232 232"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M166.524 51.4683L116.367 101.625L65.5235 51.4683L116.367 0.62434L166.524 51.4683ZM231.11 116.054L180.953 166.898L130.796 116.054L180.953 65.8969L231.11 116.054ZM101.939 116.054L51.0948 166.898L0.250934 116.054L51.0948 65.8969L101.939 116.054ZM166.524 181.326L116.367 231.483L65.5235 181.326L116.367 130.482L166.524 181.326Z"
												fill="#0c0c0c"
											/>
										</svg>
										Kahri
									</span>
								</A>
								<button type="button" class="hidden rounded-lg focus:shadow-outline focus:outline-none">
									{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
									<svg fill="currentColor" viewBox="0 0 20 20" class="size-6">
										<path
											fill-rule="evenodd"
											d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
											clip-rule="evenodd"
										/>
										<path
											fill-rule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</div>
							<div class="mt-5 flex flex-grow flex-col px-4">
								<nav class="flex-1 space-y-1 bg-bg-default">
									{sections.map((section) => (
										<>
											<p class="px-4 pt-4 font-semibold text-fg-subtle text-xs uppercase">
												{section.name}
											</p>
											<ul>
												{section.items.map((item) => (
													<li>
														<a
															class="mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-fg-subtle text-sm transition duration-200 ease-in-out hover:scale-95 hover:bg-bg-subtle hover:text-accent-emphasized focus:shadow-outline"
															href={item.href}
														>
															<item.icon class="size-4" />
															<span class="ml-4">{item.name}</span>
														</a>
													</li>
												))}
											</ul>
										</>
									))}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</Drawer.Root>

			<div class="flex w-0 flex-1 flex-col overflow-hidden">
				<main class="relative flex-1 overflow-y-auto focus:outline-none">
					<div class="py-6">
						<div class="mx-auto px-4 2xl:max-w-7xl md:px-8 sm:px-6">
							<div class="py-4">{children}</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
