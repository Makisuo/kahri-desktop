import { createSignal, onMount } from "solid-js"

export const IngameVcPage = () => {
	const [localStream, setLocalStream] = createSignal<MediaStream | null>(null)
	const [remoteStream, setRemoteStream] = createSignal<MediaStream | null>(null)

	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			setLocalStream(stream)

			const peerConnection = new RTCPeerConnection()
			peerConnection.ontrack = (event) => {
				setRemoteStream(event.streams[0])
			}

			for (const track of stream.getTracks()) {
				peerConnection.addTrack(track, stream)
			}
		} catch (error) {
			console.error("Error accessing media devices:", error)
		}
	})

	return (
		<div>
			<video ref={localStream} autoplay muted />
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<video ref={remoteStream} autoplay />
			<ul>
				{users().map((user) => (
					<li key={user.id}>
						<video ref={user.stream} autoplay />
					</li>
				))}
			</ul>
		</div>
	)
}
