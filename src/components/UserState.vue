<script lang="ts" setup>
import { ArrowPathIcon } from "@heroicons/vue/24/solid"

import { useStorage } from "@vueuse/core"
import { useApi } from "../composables/useApi"
import { useToast } from "../composables/useToast"
import { onMounted } from "vue"
import { useUserStore, useTitleStore } from "../store"
import { useRouter } from "vue-router"

const { warning, success } = useToast({ duration: 2000 })
const userAccessToken = useStorage("user-access-token", "")
const { userSignInfo, appCookies, userSignRefresh } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const userState = useUserStore()
const { setTitle } = useTitleStore()

const $router = useRouter()

onMounted(async () => {
	const userInfo = await userSignInfo()

	if ("message" in userInfo) {
		warning(userInfo.message)
		$router.push({ name: "Sign" })
	} else {
		success(`欢迎，${userInfo.name}`)
		userState.update(userInfo)

		setTitle(`${userInfo.name} Login`)

		const cookies = await appCookies()
		setTimeout(async () => {
			if ("refresh_token" in cookies.signed) {
				success("Refresh Token Generating...")
				const refreshData = await userSignRefresh()
				if ("accessToken" in refreshData)
					userAccessToken.value = refreshData.accessToken
			} else {
				console.log("[Debug Refresh Token]", cookies)
				warning("Refresh Token Not Valid")
			}
		}, 2000)
	}
})
</script>

<template>
	<div class="user-state">
		<RouterLink class="info" :to="`/user/${userState.id}`" v-if="userState.id">
			<span class="nickname">{{ userState.name }}</span>
			<span class="id">#{{ userState.id.substring(0, 8) }}</span>
		</RouterLink>
		<ArrowPathIcon class="icon async" v-else />
	</div>
</template>

<style lang="postcss" scoped>
.user-state {
	@apply inline-flex justify-center items-center px-2 py-1
  rounded bg-slate-200 dark:bg-slate-700;
}
.user-state:has(.info) {
	@apply pr-2;
}
.user-state:has(.router-link-exact-active) {
	@apply bg-green-300 dark:bg-green-600
	text-slate-500 dark:text-slate-800;
}

.user-state .icon {
	@apply w-5 h-5;
}
.async.icon {
	@apply animate-spin;
}

.info {
	@apply flex flex-col justify-center items-start;
}

.info .nickname {
	@apply text-xs font-bold;
}

.info .id {
	@apply text-xs text-slate-600 dark:text-slate-300;
}
.user-state:has(.router-link-exact-active) .info .id {
	@apply text-slate-500 dark:text-slate-700;
}
</style>
