import { defineStore } from "pinia"
import { User } from "../shared"

export const useUserStore = defineStore("user-data", {
	state() {
		return {
			username: "",
			name: "",
			qq: "",
			id: "",
			state: "Offline",
		} as User
	},
	actions: {
		update(data: User) {
			this.username = data.username
			this.name = data.name
			this.qq = data.qq
			this.id = data.id
			this.state = data.state
		},
	},
})
