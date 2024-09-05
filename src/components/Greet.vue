<script setup lang="ts">
import { ref } from "vue"
import { invoke } from "@tauri-apps/api/core"
import { useToast } from "../composables/useToast"
import { useTitleStore } from "../store"

const greetMsg = ref("")
const name = ref("")

const { success } = useToast({ duration: 3000 })
async function greet() {
	// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
	greetMsg.value = await invoke("greet", { name: name.value })
	success(greetMsg.value)

	const { setTitle } = useTitleStore()
	setTitle(`${name.value} Logined`)
}
</script>

<template>
	<form class="row" @submit.prevent="greet">
		<input
			id="greet-input"
			v-model="name"
			placeholder="Enter a name..."
			autocomplete="off"
		/>
		<button type="submit">Login</button>
	</form>

	<p>{{ greetMsg }}</p>
</template>
