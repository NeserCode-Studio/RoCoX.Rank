<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import SignIn from "../components/SignIn.vue"
import SignUp from "../components/SignUp.vue"
</script>

<template>
	<TabGroup class="sign-tab-group" as="div">
		<TabList class="sign-tab-list" as="div">
			<Tab class="sign-tab">登入</Tab>
			<Tab class="sign-tab">注册</Tab>
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
  rounded bg-stone-300 dark:bg-cyan-700;
}
.sign-tab {
	@apply inline-flex justify-center items-center px-2 py-0.5
  rounded bg-slate-100
  outline-none;
}
</style>
