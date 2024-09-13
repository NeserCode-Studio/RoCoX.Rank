<script lang="ts" setup>
import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useApi } from "../composables/useApi"
import { useUserStore } from "../store"
import { watchOnce } from "@vueuse/core"

const $route = useRoute()
const params = computed(() => $route.params as { id: string })
const { findUser } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const userState = useUserStore()
const { userSignOut } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})

watchOnce(
	() => params.value.id,
	async (newId) => {
		console.log("[Debug User]", newId)
		const userInfo = await findUser({
			type: "id",
			payload: newId,
		})

		userState.update({
			id: userInfo.id,
			username: userInfo.username,
			name: userInfo.name,
			state: userInfo.state,
			qq: userInfo.qq,
		})
	},
	{ immediate: true }
)

const signOut = () => {
	userSignOut({ userId: userState.id })
}
</script>

<template>
	<div class="user-main">
		<p>
			<span class="nickname">{{ userState.name }}</span>
		</p>
		<p>
			<span class="username">{{ userState.username }}</span>
			<span class="id">{{ userState.id }}</span>
		</p>
		<p>
			<span class="state">{{ userState.state }}</span>
		</p>

		<button type="button" @click="signOut">Logout</button>
	</div>
</template>

<style lang="postcss" scoped></style>
