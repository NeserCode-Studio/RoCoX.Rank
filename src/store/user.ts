import { defineStore } from "pinia"

export const useUserStore = defineStore("user-data", {
	state() {
		return {
			username: "",
			name: "",
			qq: "",
			id: "",
		}
	},
	actions: {
		update(data: any) {
			this.username = data.username
			this.name = data.name
			this.qq = data.qq
			this.id = data.id
		},
	},
})
