import { defineStore } from "pinia"

export const useTitleStore = defineStore("app-title", {
	state() {
		return {
			title: "Dynamic Title",
		}
	},
	actions: {
		setTitle(title: string) {
			this.title = title
		},
		resetTitle() {
			this.title = "Dynamic Title"
		},
	},
})
