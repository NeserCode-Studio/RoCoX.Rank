<script lang="ts" setup>
import { useStorage } from "@vueuse/core"
import { nextTick, ref } from "vue"
import { useRouter } from "vue-router"

import { useToast } from "../composables/useToast"
import { useApi } from "../composables/useApi"

const username = ref("")
const password = ref("")
const isOpenAutoComplete = useStorage("rocox-input-auto-complete", false)

const { info, success } = useToast()
const { userSignIn } = useApi({ baseUrl: "http://localhost:4444", headers: {} })

const userAccessToken = useStorage("user-access-token", "")

const $router = useRouter()
const signIn = async () => {
	const response = await userSignIn({
		username: username.value,
		password: password.value,
	})

	if ("message" in response) {
		info(response.message)
	} else {
		if ("accessToken" in response && "user" in response) {
			success(`欢迎，${response.user.name}`)
			userAccessToken.value = response.accessToken
			nextTick(() => {
				$router.push(`/user/${response.user.id}`)
			})
		}
	}
}
</script>

<template>
	<div class="sign-in">
		<form @submit.prevent="signIn" class="sign-in-form">
			<span class="form-item">
				<label class="labels" for="sign-in-username">用户名</label>
				<input
					id="sign-in-username"
					class="form-input"
					type="text"
					v-model="username"
					minlength="1"
					required
					placeholder="Username"
					:autocomplete="isOpenAutoComplete ? 'on' : 'off'"
				/>
			</span>
			<span class="form-item">
				<label class="labels" for="sign-in-password">密码</label>
				<input
					id="sign-in-password"
					class="form-input"
					type="password"
					v-model="password"
					minlength="6"
					required
					placeholder="Password"
					:autocomplete="isOpenAutoComplete ? 'on' : 'off'"
				/>
			</span>

			<span class="form-item option">
				<span class="option-item autocomplete">
					<label class="labels" for="sign-in-autocomplete">自动填充</label>
					<input
						id="sign-in-autocomplete"
						class="form-checkbox"
						type="checkbox"
						v-model="isOpenAutoComplete"
						:autocomplete="isOpenAutoComplete ? 'on' : 'off'"
					/>
				</span>
			</span>

			<button class="sign-in-button" type="submit">登入</button>
		</form>
	</div>
</template>

<style lang="postcss" scoped>
.sign-in-form {
	@apply w-full flex flex-col justify-center items-center p-4 gap-2
  select-none;
}

.form-item,
.option-item {
	@apply w-full inline-flex justify-between items-center gap-2;
}

.form-item:not(.option) .labels {
	@apply font-bold;
}
.form-input {
	@apply w-full max-w-36;
}

.option {
	@apply flex-row flex-wrap mt-4 pt-2
  border-t-2 border-dashed text-sm
  border-zinc-300 dark:border-zinc-700
  transition-all ease-in-out duration-200;
}
.option-item {
	@apply w-fit opacity-80 hover:opacity-100
  transition-all ease-in-out duration-200;
}

.sign-in-button {
	@apply inline-flex justify-center items-center py-1 px-3 my-4
  border-2 rounded bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-700
  border-green-400 dark:border-green-700
  transition-colors ease-in-out duration-200;
}
</style>
