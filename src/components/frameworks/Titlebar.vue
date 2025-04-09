<script lang="ts" setup>
import {
  MinusIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  PaperClipIcon,
} from "@heroicons/vue/20/solid";
import { onMounted, computed } from "vue";
import { useStorage, useThrottleFn } from "@vueuse/core";

import { getCurrentWindow } from "@tauri-apps/api/window";

import { useDark } from "../../composables/useDark";
import { useTitleStore } from "../../store";

const appWindow = getCurrentWindow();
const titleText = computed(() => {
  const { title } = useTitleStore();

  return title;
});

const isAlwaysonTop = useStorage("app-always-on-top", false);

const ispinnedClass = computed(() => {
  return isAlwaysonTop.value ? "pinned" : null;
});

// Initial
onMounted(async () => {
  await appWindow.setAlwaysOnTop(isAlwaysonTop.value);
});

async function toggleIspinned() {
  isAlwaysonTop.value = !isAlwaysonTop.value;
  await appWindow.setAlwaysOnTop(isAlwaysonTop.value);
}
const throttleToggleIspinned = useThrottleFn(() => {
  toggleIspinned();
}, 800);

function minimize() {
  let element = document.querySelector(".minimize.btn") as HTMLElement;
  element.classList.remove("moving");
  appWindow.minimize();
}

async function close() {
  await appWindow.close();
}

function addMoveClass(event: MouseEvent) {
  let element = event.target as HTMLElement;
  element.classList.add("moving");
}
function removeMoveClass(event: MouseEvent) {
  let element = event.target as HTMLElement;
  element.classList.remove("moving");
}

const { isDark, toggle: toggleDark } = useDark();
</script>

<template>
  <div id="app-title-bar" data-tauri-drag-region>
    <span class="title" data-tauri-drag-region>
      <span data-tauri-drag-region
        >{{ titleText }} · Roco X Rank Generator</span
      >
    </span>
    <div class="buttons" data-tauri-drag-region>
      <span
        :class="['btn', 'pin', ispinnedClass]"
        @mouseenter="addMoveClass"
        @mouseleave="removeMoveClass"
        @click="throttleToggleIspinned"
      >
        <PaperClipIcon class="icon" />
      </span>
      <span
        class="btn darkmode"
        @mouseenter="addMoveClass"
        @mouseleave="removeMoveClass"
        @click="toggleDark()"
      >
        <SunIcon v-show="!isDark" />
        <MoonIcon v-show="isDark" />
      </span>
      <span
        class="btn minimize"
        @mouseenter="addMoveClass"
        @mouseleave="removeMoveClass"
        @click="minimize"
      >
        <MinusIcon />
      </span>
      <span
        class="btn close danger"
        @mouseenter="addMoveClass"
        @mouseleave="removeMoveClass"
        @click="close"
      >
        <XMarkIcon />
      </span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
#app-title-bar {
  @apply relative inline-flex items-center justify-end w-full h-8
	border-b border-slate-300 dark:border-slate-600
	bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-200
	transition-all
  select-none;

  z-index: 99999999;
}

.title {
  @apply absolute inline-flex items-center top-1/2 left-2
	text-sm font-black
	-translate-y-1/2;
}

.buttons {
  @apply inline-flex flex-row items-center justify-end w-full h-full;
}

.btn {
  @apply inline-flex items-center justify-center w-12 h-full py-2 px-3
	cursor-pointer rounded-none
	text-slate-600 dark:text-slate-100 
	transition ease-in-out duration-300;
}
.moving {
  @apply bg-slate-600 text-slate-100;
}
.moving.danger {
  @apply bg-red-400;
}

.darkmode {
  @apply w-10 py-1.5 px-3;
}

.pin {
  @apply w-10 p-0;
}
.pin .icon {
  @apply w-5 p-1 transition-all
	rounded scale-125;
}
.pin.moving .icon {
  @apply rotate-[135deg];
}

.pin.pinned .icon {
  @apply bg-slate-600 text-slate-100 rotate-[135deg] scale-100;
}
</style>
