import { Header } from "~/components/ui/card"
import { Text } from "~/components/ui/text"
import { Avatar } from "../components/ui/avatar"

function App() {
	return (
		<div>
			<Header as="h1">Welcome back Makisuo!</Header>

			<Avatar src="https://i.pravatar.cc/300" name="John Doe" />

			<Text>Click on the Tauri, Vite, and Solid logos to learn more.</Text>
		</div>
	)
}

export default App
