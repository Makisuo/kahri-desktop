import { makePersisted } from "@solid-primitives/storage"
import { createEffect, createSignal } from "solid-js"

function createGlobalPersistedState<T>(key: string, defaultValue: T) {
	const [globalState, setGlobalState] = createSignal<T>(defaultValue)
	const [localStorageState, setLocalStorageState] = makePersisted(createSignal<T>(defaultValue), { name: key })

	createEffect(() => {
		setLocalStorageState(globalState)
	})

	return () => [localStorageState, setGlobalState]
}

export const useVideoInputDeviceId = createGlobalPersistedState("videoinput-device-id", undefined)
export const useVideoInputDeviceLabel = createGlobalPersistedState("videoinput-device-label", undefined)
export const useAudioInputDeviceId = createGlobalPersistedState("audioinput-device-id", undefined)
export const useAudioInputDeviceLabel = createGlobalPersistedState("audioinput-device-label", undefined)
export const useAudioOutputDeviceId = createGlobalPersistedState("audiooutput-device-id", undefined)
