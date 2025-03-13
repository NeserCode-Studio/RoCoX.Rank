<script lang="ts" setup>
import { useStorage } from "@vueuse/core";
import { ref } from "vue";

import { useToast } from "../composables/useToast";
import { useApi } from "../composables/useApi";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
const qq = ref("");
const nickname = ref("");
const isOpenAutoComplete = useStorage("rocox-input-auto-complete", false);

const { info, error } = useToast();
const { userSignUp } = useApi({
  baseUrl: "http://localhost:3000",
  headers: {},
});

const $router = useRouter();
const signUp = () => {
  if (password.value !== passwordConfirm.value) {
    password.value = "";
    passwordConfirm.value = "";
    return error("两次密码不一致");
  }

  userSignUp({
    username: username.value,
    password: password.value,
    qq: qq.value,
    name: nickname.value,
  })
    .then((res) => {
      if ("message" in res) error(res.message);
      else {
        info(`Sign up as ${username.value}`);
        $router.push("/sign");
      }
    })
    .finally(() => {
      username.value = "";
      password.value = "";
      passwordConfirm.value = "";
      qq.value = "";
      nickname.value = "";
    });
};
</script>

<template>
  <div class="sign-up">
    <form @submit.prevent="signUp" class="sign-up-form">
      <span class="form-item">
        <label class="labels" for="sign-up-username">用户名*</label>
        <input
          id="sign-up-username"
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
        <label class="labels" for="sign-up-password">密码*</label>
        <input
          id="sign-up-password"
          class="form-input"
          type="password"
          v-model="password"
          minlength="6"
          required
          placeholder="Password"
          :autocomplete="isOpenAutoComplete ? 'on' : 'off'"
        />
      </span>
      <span class="form-item">
        <label class="labels" for="sign-up-password-confirm">确认密码*</label>
        <input
          id="sign-up-password-confirm"
          class="form-input"
          type="password"
          v-model="passwordConfirm"
          minlength="6"
          required
          placeholder="Password Confirm"
          :autocomplete="isOpenAutoComplete ? 'on' : 'off'"
        />
      </span>
      <span class="form-item">
        <label class="labels" for="sign-up-qq">QQ*</label>
        <input
          id="sign-up-qq"
          class="form-input"
          type="text"
          v-model="qq"
          minlength="6"
          required
          placeholder="QQ Number"
          :autocomplete="isOpenAutoComplete ? 'on' : 'off'"
        />
      </span>
      <span class="form-item">
        <label class="labels" for="sign-up-nickname">昵称</label>
        <input
          id="sign-up-nickname"
          class="form-input"
          type="text"
          v-model="nickname"
          minlength="1"
          maxlength="7"
          placeholder="Nickname"
          :autocomplete="isOpenAutoComplete ? 'on' : 'off'"
        />
      </span>

      <span class="form-item option">
        <span class="option-item autocomplete">
          <label class="labels" for="sign-up-autocomplete">自动填充</label>
          <input
            id="sign-up-autocomplete"
            class="form-checkbox"
            type="checkbox"
            v-model="isOpenAutoComplete"
            :autocomplete="isOpenAutoComplete ? 'on' : 'off'"
          />
        </span>
      </span>

      <button class="sign-up-button" type="submit">注册</button>
    </form>
  </div>
</template>

<style lang="postcss" scoped>
.sign-up-form {
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
  @apply w-full max-w-48;
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

.sign-up-button {
  @apply inline-flex justify-center items-center py-1 px-3 my-4
  border-2 rounded bg-green-300 hover:bg-green-400 dark:bg-green-800 dark:hover:bg-green-700
  border-green-400 dark:border-green-700
  transition-colors ease-in-out duration-200;
}
</style>
