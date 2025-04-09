<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogClose from "../ui/dialog/DialogClose.vue";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger"></slot>
    </DialogTrigger>
    <DialogContent class="max-h-[75vh]">
      <DialogHeader>
        <DialogTitle>
          <slot name="dialog-title"></slot>
        </DialogTitle>
        <DialogDescription>
          <slot name="dialog-description"></slot>
        </DialogDescription>
      </DialogHeader>
      <div class="content-container">
        <slot name="dialog-inner-content"></slot>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <slot name="dialog-footer"></slot>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="postcss" scoped>
.content-container {
  @apply relative max-h-[45vh] flex justify-center items-center
  overflow-y-auto;
}
</style>
