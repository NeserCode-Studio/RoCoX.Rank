<script lang="ts" setup>
import {
	ArrowLeftStartOnRectangleIcon,
	ArrowPathIcon,
} from "@heroicons/vue/24/solid"

import { useStorage } from "@vueuse/core"
import { useApi } from "../composables/useApi"
import { useToast } from "../composables/useToast"
import { onMounted } from "vue"
import { useUserStore, useTitleStore } from "../store"

const { warning, success } = useToast({ duration: 2000 })
const userAccessToken = useStorage("user-access-token", "")
const { userSignInfo, appCookies, userSignRefresh } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const userState = useUserStore()
const { setTitle } = useTitleStore()

onMounted(async () => {
	const userInfo = await userSignInfo()

	if ("message" in userInfo) warning(userInfo.message)
	else success(`欢迎，${userInfo.name}`)

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
})

function stateMatch(state: "async" | "online") {
	if (state === "online") return userState.id.length > 8
	return userState.state !== "Online"
}
</script>

<template>
	<div class="user-state">
		<span class="state-icon">
			<ArrowLeftStartOnRectangleIcon class="icon" v-if="stateMatch('online')" />
			<ArrowPathIcon class="icon async" v-else-if="stateMatch('async')" />
		</span>
		<RouterLink
			class="info"
			:to="`/user/${userState.id}`"
			v-if="userState.id.length > 8"
		>
			<span class="username">{{ userState.username }}</span>
			<span class="id">#{{ userState.id.substring(0, 8) }}</span>
		</RouterLink>
	</div>
</template>

<style lang="postcss" scoped>
.user-state {
	@apply inline-flex justify-center items-center px-0 py-1
  rounded bg-slate-200 dark:bg-slate-700;
}
.user-state:has(.info) {
	@apply pr-2;
}

.state-icon {
	@apply h-full w-fit px-2 py-1;
}
.state-icon .icon {
	@apply w-5 h-5;
}
.async.icon {
	@apply animate-spin;
}

.info {
	@apply flex flex-col justify-center items-end;
}

.info .username {
	@apply text-xs font-bold;
}

.info .id {
	@apply text-xs text-gray-400;
}
</style>
