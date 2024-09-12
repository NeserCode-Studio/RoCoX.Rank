<script lang="ts" setup>
import Titlebar from "./components/frameworks/Titlebar.vue"
import { Toaster } from "vue-sonner"
import { computed } from "vue"

import { useDark } from "./composables/useDark"

const { isDark } = useDark()
const computedColorSchemeClass = computed(() =>
	isDark.value ? "dark" : "light"
)
</script>

<template>
	<div id="app-main">
		<Titlebar />
		<Toaster :theme="computedColorSchemeClass" richColors />
		<div>
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
			<router-link to="/sign">Sign</router-link>
		</div>
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<style lang="postcss" scoped>
#app-main {
	@apply flex flex-col justify-start items-center h-screen
	bg-slate-50 dark:bg-slate-800
	transition-colors ease-in-out duration-200;
}
</style>
