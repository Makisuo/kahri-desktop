import { invoke } from "@tauri-apps/api/tauri"
import { createSignal } from "solid-js"
import { Header } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Avatar } from "../components/ui/avatar"

function App() {
	const [greetMsg, setGreetMsg] = createSignal("")
	const [name, setName] = createSignal("")

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		setGreetMsg(await invoke("greet", { name: name() }))
	}

	return (
		<div>
			<Header>Welcome to Kahri!</Header>

			<Avatar src="https://i.pravatar.cc/300" name="John Doe" />

			<div class="row">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src="/vite.svg" class="logo vite" alt="Vite logo" />
				</a>
				<a href="https://tauri.app" target="_blank" rel="noreferrer">
					<img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
				</a>
			</div>

			<Text>Click on the Tauri, Vite, and Solid logos to learn more.</Text>

			<form
				class="row"
				onSubmit={(e) => {
					e.preventDefault()
					greet()
				}}
			>
				<input
					id="greet-input"
					onChange={(e) => setName(e.currentTarget.value)}
					placeholder="Enter a name..."
				/>
				<button type="submit">Greet</button>
			</form>

			<p>{greetMsg()}</p>
		</div>
	)
}

export default App
