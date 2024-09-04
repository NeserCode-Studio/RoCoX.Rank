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
		<router-link to="/">Home</router-link>
		<router-link to="/about">About</router-link>
		<router-view></router-view>
	</div>
</template>

<style lang="postcss" scoped></style>
