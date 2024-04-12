import { createSignal, onMount } from "solid-js"
import { useUserMedia } from "~/lib/hooks/use-user-media"

export const IngameVcPage = () => {
	const userMedia = useUserMedia("development")

	console.log(userMedia)
	const [localStream, setLocalStream] = createSignal<MediaStream | null>(null)
	const [remoteStream, setRemoteStream] = createSignal<MediaStream | null>(null)

	const userStream = userMedia.videoStreamTrack()
	return (
		<div>
			<video ref={localStream} autoplay muted />
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<video ref={remoteStream} autoplay />
		</div>
	)
}
