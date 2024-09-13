<script lang="ts" setup>
import { HomeIcon, InformationCircleIcon } from "@heroicons/vue/24/solid"
import UserState from "../UserState.vue"
</script>

<template>
	<div class="top-links">
		<router-link class="router-link" to="/">
			<HomeIcon class="icon" />
			<span class="text">Home</span>
		</router-link>
		<router-link class="router-link" to="/about">
			<InformationCircleIcon class="icon" />
			<span class="text">About</span>
		</router-link>

		<UserState class="state user-state" />
	</div>
</template>

<style lang="postcss" scoped>
.top-links {
	@apply relative w-full flex justify-center items-center gap-4 py-4
  border-b border-slate-200 dark:border-slate-700 shadow z-10
  transition-colors ease-in-out duration-200;
}

.router-link {
	@apply inline-flex items-center gap-x-1 px-2 py-1
  rounded bg-slate-200 dark:bg-slate-700
  shadow font-semibold
  select-none transition-colors ease-in-out duration-200;
}
.router-link .icon {
	@apply w-5 h-5;
}

.router-link.router-link-exact-active {
	@apply bg-green-400 dark:bg-green-500
  text-slate-100 dark:text-slate-800;
}

.state {
	@apply absolute;
}

.state.user-state {
	@apply right-4;
}
</style>
