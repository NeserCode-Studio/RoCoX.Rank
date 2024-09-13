<script lang="ts" setup>
import Titlebar from "./components/frameworks/Titlebar.vue"
import { Toaster } from "vue-sonner"
import { computed, onMounted } from "vue"

import { useDark } from "./composables/useDark"
import { useCookie } from "./composables/useCookie"
import TopLinks from "./components/frameworks/TopLinks.vue"

const { isDark } = useDark()
const computedColorSchemeClass = computed(() =>
	isDark.value ? "dark" : "light"
)

const { deployCookie } = useCookie()

onMounted(() => {
	deployCookie()
})
</script>

<template>
	<div id="app-main">
		<Titlebar />
		<Toaster :theme="computedColorSchemeClass" richColors />

		<TopLinks />
		<router-view v-slot="{ Component }" id="view-content">
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

#view-content {
	height: calc(100% - 2rem - 4rem - 2px);
	@apply w-full flex flex-col
	overflow-y-auto overflow-x-hidden
	transition-colors ease-in-out duration-200 delay-0;
}
</style>
