<script lang="ts" setup>
import AlertDialog from "@/components/presets/alertDialog.vue";
import Dialog from "@/components/presets/dialog.vue";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "vue-router";
import { useApi } from "../composables/useApi";
import { useUserStore } from "../store";
import { useStorage } from "@vueuse/core";
import { useCookie } from "../composables/useCookie";
import { useToast } from "../composables/useToast";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "@/lib/zod.zh-CN";
import { ref } from "vue";

const userState = useUserStore();
const { userSignOut } = useApi({
  baseUrl: "http://localhost:3000",
  headers: {},
});
const { success } = useToast({ duration: 3000 });

const $router = useRouter();
const userAccessToken = useStorage("user-access-token", "");
const { clearCookie } = useCookie();
const signOut = () => {
  userSignOut({ uid: userState.id });
  userAccessToken.value = "";
  userState.reset();
  clearCookie("refresh_token");
  $router.push({ path: "/sign" });
  success("已成功登出");
};

const copy = async (text: string) => {
  success("已复制所选内容到剪贴板");
  await navigator.clipboard.writeText(text);
};

const updateData = ref({
  nickname: userState.nickname,
  qq: userState.qq,
  email: userState.email,
  rocoName: userState.rocoName,
});
console.log(userState, updateData.value);
const formSchema = toTypedSchema(
  z.object({
    nickname: z.string().min(2).max(20),
    qq: z.string().min(5).max(15),
    email: z.string().email(),
    rocoName: z.string().min(2).max(14),
  })
);
const onSubmit = (values: any) => {
  console.log(values, updateData.value);
  userState.update({
    ...values,
  });
};
</script>

<template>
  <div class="user-main">
    <p class="name" @dblclick="copy(userState.displayName)">
      <span class="nickname">{{ userState.displayName }}</span>
    </p>
    <p class="info" @dblclick="copy(userState.username)">
      <span class="username">{{ userState.username }}</span
      >·<span class="state">{{ userState.state }}</span>
    </p>
    <p class="uid" @dblclick="copy(userState.id)">
      <span class="id">{{ userState.id }}</span>
    </p>

    <div class="operation">
      <Form
        v-slot="{ handleSubmit }"
        as="div"
        keep-values
        :validation-schema="formSchema"
      >
        <Dialog>
          <template #trigger>
            <button class="update" type="button">更新个人信息</button>
          </template>
          <template #dialog-title> 个人信息 · 更新 </template>
          <template #dialog-description>
            <span
              >您可以在此处更新您的个人信息，在按下确认修改后更新将会被更新至云端。</span
            >
          </template>
          <template #dialog-inner-content>
            <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
              <FormField v-slot="{ componentField }" name="nickname">
                <FormItem>
                  <FormLabel>昵称</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="昵称"
                      v-model="updateData.nickname"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription>用户于软件中显示的名称</FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="qq">
                <FormItem>
                  <FormLabel>QQ</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="QQ"
                      v-model="updateData.qq"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel>电子邮箱</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="电子邮箱"
                      v-model="updateData.email"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="rocoName">
                <FormItem>
                  <FormLabel>游戏昵称</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="游戏昵称"
                      v-model="updateData.rocoName"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              </FormField>
            </form>
          </template>
          <template #dialog-footer>
            <button class="update" type="submit" form="dialogForm">
              确认信息
            </button>
          </template>
        </Dialog>
      </Form>

      <AlertDialog>
        <template #trigger>
          <button class="logout" type="button">登出</button>
        </template>
        <template #dialog-title>请注意 · 确认登出</template>
        <template #dialog-description>
          <span
            >您正在执行
            <b>登出</b>
            操作，确认后您于本地存储的个人信息、登录状态将会被
            <b>清除</b> ，在线状态在云端会被同步。</span
          >
        </template>
        <template #action>
          <button class="logout" type="button" @click="signOut">确定</button>
        </template>
      </AlertDialog>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.user-main {
  @apply inline-flex flex-col items-center py-12 gap-2
	select-none;
}

.name {
  @apply text-3xl font-bold;
}
.info {
  @apply inline-flex justify-center items-center gap-2
	opacity-60;
}
.uid {
  @apply opacity-0 hover:opacity-100
  transition-opacity ease-in-out duration-200;
}

#dialogForm {
  @apply w-full h-full flex-col px-12 py-4;
}

.operation {
  @apply inline-flex gap-2 mt-4;
}
button.update {
  @apply px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900
  text-blue-500 dark:text-blue-300
  transition-all duration-300 ease-in-out
  cursor-pointer shadow
  opacity-80 hover:opacity-100;
}
button.logout {
  @apply px-2 py-1 rounded-md bg-red-500 text-white
	transition-all duration-300 ease-in-out
	cursor-pointer shadow
	opacity-80 hover:opacity-100;
}
</style>
