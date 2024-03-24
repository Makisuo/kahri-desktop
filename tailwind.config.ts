import { parkwindPlugin } from "@park-ui/tailwind-plugin"
import type { Config } from "tailwindcss"

const config: Config = {
	content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [parkwindPlugin],
	parkUI: {
		accentColor: "iris",
		grayColor: "neutral",
		borderRadius: "sm",
	},
	darkMode: ["class"],
}

export default config
