<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useApi } from "../composables/useApi"
import { useUserStore, useWatchingUserStore } from "../store"
import { useStorage, watchOnce } from "@vueuse/core"
import { useCookie } from "../composables/useCookie"
import { useToast } from "../composables/useToast"

const $route = useRoute()
const params = computed(() => $route.params as { id: string })
const { findUser } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const userState = useUserStore()
const watchingUserState = useWatchingUserStore()
const { userSignOut } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const { success } = useToast({ duration: 3000 })

const generator = watchOnce(
	() => params.value.id,
	async (newId) => {
		console.log("[Debug User]", newId)
		const userInfo = await findUser({
			type: "id",
			payload: newId,
		})

		watchingUserState.update({
			id: userInfo.id,
			username: userInfo.username,
			name: userInfo.name,
			state: userInfo.state,
			qq: userInfo.qq,
		})
	},
	{ immediate: true }
)

const $router = useRouter()
watchOnce(
	() => watchingUserState.id,
	(oldId, newId) => {
		if (newId?.length && !oldId?.length) {
			generator()
			$router.push({ name: "Sign" })
		}
	}
)

const userAccessToken = useStorage("user-access-token", "")
const { clearCookie } = useCookie()
const signOut = () => {
	userSignOut({ userId: userState.id })
	userAccessToken.value = ""
	watchingUserState.reset()
	userState.reset()
	clearCookie("refresh_token")
	$router.push({ path: "/sign" })
	success("已成功登出")
}

onMounted(() => {
	generator()
})
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

		<button
			type="button"
			@click="signOut"
			v-if="userState.id === watchingUserState.id"
		>
			Logout
		</button>
	</div>
</template>

<style lang="postcss" scoped></style>
