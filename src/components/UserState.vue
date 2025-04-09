<script lang="ts" setup>
import { ArrowPathIcon, SignalSlashIcon } from "@heroicons/vue/24/solid";

import { useStorage } from "@vueuse/core";
import { useApi } from "../composables/useApi";
import { useToast } from "../composables/useToast";
import { computed, onMounted, ref } from "vue";
import { useUserStore, useTitleStore } from "../store";
import { useRouter } from "vue-router";
import { useCookie } from "../composables/useCookie";

const { warning, success } = useToast({ duration: 2000 });
const userAccessToken = useStorage("user-access-token", "");
const { userSignInfo, userSignRefresh } = useApi({
  baseUrl: "http://localhost:3000",
  headers: {},
});
const userState = useUserStore();
const { setTitle } = useTitleStore();

const $router = useRouter();
const asyncState = ref(true);
const userOnline = computed(() => !!userState.id.length);

onMounted(async () => {
  asyncState.value = true;

  try {
    const userInfo = await userSignInfo();

    if ("message" in userInfo) {
      const { allCookies } = useCookie();
      if (allCookies.value.some((cookie) => cookie.name === "$refresh")) {
        success("正在配置自动登录");
        const refreshData = await userSignRefresh({ uid: userState.id });
        if ("$access_token" in refreshData)
          userAccessToken.value = refreshData.$access_token;
        else {
          warning("登录环境已失效，请重新登录");
          userState.reset();
          userAccessToken.value = "";
          $router.push({ name: "Sign" });
        }
      } else {
        warning(userInfo.message ?? "Invlid Operation");
        $router.push({ name: "Sign" });
      }
    } else if ("id" in userInfo) {
      userState.update(userInfo);
      success(`自动登录为${userState.displayName}`);

      setTitle(`As ${userState.displayName}`);
    }
  } catch {
    warning("获取用户信息失败，请登录");
  } finally {
    asyncState.value = false;
  }
});
</script>

<template>
  <div class="user-state">
    <RouterLink class="info" :to="`/user/${userState.id}`" v-if="userOnline">
      <span class="nickname">{{ userState.displayName }}</span>
      <span class="id">{{ userState.id.substring(0, 8) }}</span>
    </RouterLink>
    <RouterLink class="info offline" to="/sign" v-else-if="!asyncState">
      <SignalSlashIcon class="icon" />
      <span class="text">Offline</span>
    </RouterLink>
    <ArrowPathIcon class="icon async" v-else />
  </div>
</template>

<style lang="postcss" scoped>
.user-state {
  @apply inline-flex justify-center items-center px-2 py-1
  rounded bg-slate-200 dark:bg-slate-700;
}
.user-state:has(.info) {
  @apply pr-2;
}
.user-state:has(.router-link-exact-active) {
  @apply bg-green-300 dark:bg-green-600
	text-slate-500 dark:text-slate-800;
}

.user-state .icon {
  @apply w-5 h-5;
}
.async.icon {
  @apply animate-spin;
}

.info {
  @apply flex flex-col justify-center items-start;
}

.info .nickname {
  @apply text-xs font-bold;
}

.info .id {
  @apply text-xs text-slate-600 dark:text-slate-300;
}
.user-state:has(.router-link-exact-active) .info .id {
  @apply text-slate-500 dark:text-slate-700;
}

.info.offline {
  @apply flex-row items-center gap-x-1
	text-sm;
}
</style>
