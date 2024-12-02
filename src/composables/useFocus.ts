import { getCurrentWindow } from "@tauri-apps/api/window"
import { useStorage } from "@vueuse/core"

export const useFocus = async () => {
	const appWindow = getCurrentWindow()

	await appWindow.setFocus()
	let focused = useStorage("app-focused", await appWindow.isFocused())

	return {
		isFocused: focused,
		listener: async () => {
			appWindow.onFocusChanged((appFcousedEvt) => {
				focused.value = appFcousedEvt.payload
				console.log(
					`[Focus Listener] ${focused.value ? "Focused" : "Unfocused"}`
				)
			})
		},
	}
}
