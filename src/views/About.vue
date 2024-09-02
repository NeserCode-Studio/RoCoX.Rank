<script lang="ts" setup>
import { useCounterStore } from "../store"

const counterStore = useCounterStore()
</script>

<template>
	<div class="view-about">
		<h1>About Page</h1>
		<h2>Counter: {{ counterStore.count }}</h2>
		<button type="button" @click="counterStore.increment()">+1</button>
		<button type="button" @click="counterStore.decrement()">-1</button>
	</div>
</template>

<style lang="postcss" scoped></style>
