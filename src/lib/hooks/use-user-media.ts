import { makePersisted } from "@solid-primitives/storage"
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js"
import invariant from "tiny-invariant"
import { getUserMediaExtended } from "../get-user-media"
import { blackCanvasStreamTrack } from "../utils/black-canvas-stream-track"
import keyInObject from "../utils/key-in-object"
import noiseSuppression from "../utils/noise-supression"
import {
	useAudioInputDeviceId,
	useAudioInputDeviceLabel,
	useVideoInputDeviceId,
	useVideoInputDeviceLabel,
} from "./global-persisted-state"

export const errorMessageMap = {
	NotAllowedError: "Permission was denied. Grant permission and reload to enable.",
	NotFoundError: "No device was found.",
	NotReadableError: "Device is already in use.",
	OverconstrainedError: "No device was found that meets constraints",
}

export function useUserMedia(mode: string) {
	const [blurVideo, setBlurVideo] = makePersisted(createSignal(false), { name: "blur-video" })
	const [suppressNoise, setSuppressNoise] = makePersisted(createSignal(false), { name: "suppress-noise" })
	const [audioDeviceId, setAudioDeviceId] = useAudioInputDeviceId()
	const [audioDeviceLabel, setAudioDeviceLabel] = useAudioInputDeviceLabel()
	const [videoDeviceId, setVideoDeviceId] = useVideoInputDeviceId()
	const [videoDeviceLabel, setVideoDeviceLabel] = useVideoInputDeviceLabel()
	const [audioStreamTrack, setAudioStreamTrack] = createSignal<MediaStreamTrack>()
	const [mutedAudioStreamTrack, setMutedAudioStreamTrack] = createSignal<MediaStreamTrack>()
	const [audioEnabled, setAudioEnabled] = createSignal(mode === "production")
	const [videoStreamTrack, setVideoStreamTrack] = createSignal<MediaStreamTrack>()
	const [videoEnabled, setVideoEnabled] = createSignal(true)
	const [screenShareStream, setScreenShareStream] = createSignal<MediaStream>()
	const [screenShareEnabled, setScreenShareEnabled] = createSignal(false)
	const [videoUnavailableReason, setVideoUnavailableReason] = createSignal()
	const [audioUnavailableReason, setAudioUnavailableReason] = createSignal()
	const [screenshareUnavailableReason, setScreenshareUnavailableReason] = createSignal()

	const turnMicOff = () => {
		setAudioEnabled(false)
	}

	const turnMicOn = async () => {
		setAudioEnabled(true)
	}

	createEffect(() => {
		let mounted = true
		getUserMediaExtended({
			audio: audioDeviceId() ? { deviceId: audioDeviceId(), label: audioDeviceLabel() } : true,
		})
			.then(async (ms) => {
				if (!mounted) {
					for (const t of ms.getTracks()) {
						t.stop()
					}
					return
				}
				const audio = ms.getAudioTracks()[0]
				const { deviceId } = audio.getSettings()
				setAudioDeviceId(deviceId)
				setAudioDeviceLabel(
					(await navigator.mediaDevices.enumerateDevices()).find((d) => d.deviceId === deviceId)?.label,
				)
				audio.addEventListener("ended", () => {
					setAudioDeviceId(undefined)
				})

				const audioTrack = suppressNoise() ? noiseSuppression(audio) : audio

				setAudioStreamTrack((prevAudio) => {
					if (prevAudio) prevAudio.stop()
					return audioTrack
				})
				setAudioUnavailableReason(undefined)
			})
			.catch((e) => {
				if (!mounted) return
				setAudioEnabled(false)
				invariant(keyInObject(errorMessageMap, e.name))
				setAudioUnavailableReason(e.name)
			})

		getUserMediaExtended({
			audio: audioDeviceId() ? { deviceId: audioDeviceId() } : true,
		}).then((ms) => {
			if (!mounted) {
				for (const t of ms.getTracks()) {
					t.stop()
				}
				return
			}
			const [mutedTrack] = ms.getAudioTracks()
			mutedTrack.enabled = false
			setMutedAudioStreamTrack(mutedTrack)
		})

		onCleanup(() => {
			mounted = false
		})
	})

	onCleanup(() => {
		audioStreamTrack()?.stop()
		mutedAudioStreamTrack()?.stop()
		videoStreamTrack()?.stop()
		// biome-ignore lint/complexity/noForEach: <explanation>
		screenShareStream()
			?.getTracks()
			.forEach((t) => t.stop())
	})

	const turnCameraOn = () => {
		setVideoEnabled(true)
	}

	const turnCameraOff = () => {
		setVideoEnabled(false)
	}

	createEffect(() => {
		let mounted = true
		if (videoEnabled()) {
			getUserMediaExtended({
				video: videoDeviceId() ? { deviceId: videoDeviceId(), label: videoDeviceLabel() } : true,
			})
				.then(async (ms) => {
					if (!mounted) {
						for (const t of ms.getTracks()) {
							t.stop()
						}
						return
					}
					const sourceTrack = ms.getVideoTracks()[0]
					const { deviceId } = sourceTrack.getSettings()
					setVideoDeviceId(deviceId)
					setVideoDeviceLabel(
						(await navigator.mediaDevices.enumerateDevices()).find((d) => d.deviceId === deviceId)?.label,
					)

					sourceTrack.addEventListener("ended", () => {
						setVideoDeviceId(undefined)
					})

					// TODO: Renable blurVideo
					// const videoTrack = blurVideo() ? await blurVideoTrack(sourceTrack) : sourceTrack

					setVideoStreamTrack((oldTrack) => {
						if (oldTrack) {
							oldTrack.stop()
						}
						return videoTrack
					})
					setVideoUnavailableReason(undefined)
				})
				.catch((e) => {
					if (!mounted) return
					setVideoEnabled(false)
					invariant(keyInObject(errorMessageMap, e.name))
					setVideoUnavailableReason(e.name)
				})
		} else {
			setVideoStreamTrack((oldTrack) => {
				if (oldTrack) {
					const newTrack = blackCanvasStreamTrack(oldTrack)
					oldTrack.stop()
					return newTrack
				}
				return undefined
			})
		}
		onCleanup(() => {
			mounted = false
		})
	})

	const startScreenShare = () => {
		navigator.mediaDevices
			.getDisplayMedia()
			.then((ms) => {
				setScreenShareStream(ms)
				setScreenshareUnavailableReason(undefined)
				ms.getVideoTracks()[0].addEventListener("ended", () => {
					setScreenShareStream(undefined)
					setScreenShareEnabled(false)
				})
				setScreenShareEnabled(true)
			})
			.catch((e) => {
				setScreenShareEnabled(false)
				invariant(keyInObject(errorMessageMap, e.name))
				setScreenshareUnavailableReason(e.name)
			})
	}

	const endScreenShare = () => {
		const stream = screenShareStream()
		if (stream) {
			for (const t of stream.getTracks()) {
				t.stop()
			}
		}

		setScreenShareEnabled(false)
		setScreenShareStream(undefined)
	}

	const videoTrack = createMemo(() => {
		return videoEnabled() || !videoStreamTrack() ? videoStreamTrack() : blackCanvasStreamTrack(videoStreamTrack()!)
	})

	const screenShareVideoTrack = () => screenShareStream()?.getVideoTracks()[0]

	return {
		turnMicOn,
		turnMicOff,
		audioStreamTrack: () => (audioEnabled() ? audioStreamTrack() : mutedAudioStreamTrack()),
		audioMonitorStreamTrack: audioStreamTrack,
		audioEnabled,
		audioUnavailableReason,
		turnCameraOn,
		turnCameraOff,
		videoStreamTrack: videoTrack,
		videoEnabled,
		videoUnavailableReason,
		startScreenShare,
		endScreenShare,
		screenShareVideoTrack,
		screenShareEnabled,
		screenshareUnavailableReason,
		audioDeviceId,
		setAudioDeviceId,
		setVideoDeviceId,
		videoDeviceId,
		blurVideo,
		setBlurVideo,
		suppressNoise,
		setSuppressNoise,
	}
}
