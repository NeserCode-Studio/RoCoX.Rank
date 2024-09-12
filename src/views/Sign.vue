<script lang="ts" setup>
import { UserIcon, UserPlusIcon } from "@heroicons/vue/24/solid"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
import { onMounted } from "vue"
import { useApi } from "../composables/useApi"
import { useToast } from "../composables/useToast"
import { useStorage } from "@vueuse/core"
import { useTitleStore, useUserStore } from "../store"

const { warning, success, error } = useToast({ duration: 2000 })
const userAccessToken = useStorage("user-access-token", "")
const { userSignInfo, appCookies, userSignRefresh } = useApi({
	baseUrl: "http://localhost:4444",
	headers: {},
})
const { update: setUser } = useUserStore()
const { setTitle } = useTitleStore()

onMounted(async () => {
	const userInfo = await userSignInfo()

	if ("message" in userInfo) warning(userInfo.message)
	else success(`欢迎，${userInfo.name}`)

	setUser(userInfo)
	setTitle(`${userInfo.name} Login`)

	const cookies = await appCookies()
	setTimeout(async () => {
		if ("refresh_token" in cookies.signed) {
			success("Refresh Token Generating...")
			const refreshData = await userSignRefresh()
			if ("accessToken" in refreshData)
				userAccessToken.value = refreshData.accessToken
		} else {
			error("Refresh Token Not Valid")
		}
	}, 2000)
})
</script>

<template>
	<TabGroup class="sign-tab-group" as="div">
		<TabList class="sign-tab-list" as="div">
			<Tab class="sign-tab" v-slot="{ selected }">
				<button
					class="tab-btn"
					type="button"
					:class="{ 'tab-selected': selected }"
				>
					<UserIcon class="icon" />
					<span class="text">登入</span>
				</button>
			</Tab>
			<Tab class="sign-tab" v-slot="{ selected }">
				<button
					class="tab-btn"
					type="button"
					:class="{ 'tab-selected': selected }"
				>
					<UserPlusIcon class="icon" />
					<span class="text">注册</span>
				</button>
			</Tab>
		</TabList>
		<TabPanels class="sign-tab-panels" as="div">
			<TabPanel class="sign-tab-panel">
				<sign-in />
			</TabPanel>
			<TabPanel class="sign-tab-panel">
				<sign-up />
			</TabPanel>
		</TabPanels>
	</TabGroup>
</template>

<style lang="postcss">
.sign-tab-group {
	@apply flex flex-col justify-center items-center gap-2 my-4 py-4;
}

.sign-tab-list {
	@apply w-fit flex flex-row justify-center items-center gap-2 p-1
  rounded bg-stone-100 dark:bg-cyan-900
	transition-colors ease-in-out duration-200;
}
.sign-tab {
	@apply inline-flex justify-center items-center 
  rounded bg-cyan-100 dark:bg-stone-900
	transition-colors ease-in-out duration-200
  outline-none;
}
.sign-tab .tab-btn {
	@apply w-full inline-flex justify-center items-center px-2 py-0.5 gap-x-1
	border-2 border-transparent rounded outline-none
	transition-colors ease-in-out duration-200 delay-0;
}
.tab-btn .icon {
	@apply w-4 h-4;
}

.tab-btn.tab-selected {
	@apply bg-green-200 dark:bg-green-700
	border-green-300 dark:border-green-600;
}
</style>
