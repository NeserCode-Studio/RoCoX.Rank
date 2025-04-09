<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AlertDialogContentEmits } from "reka-ui";

const dismissTitlebar = (
  event: AlertDialogContentEmits["interactOutside"][0]
) => {
  const target = event.target as HTMLElement;

  if (target?.closest("#app-title-bar")) return event.preventDefault();
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot name="trigger"></slot>
    </AlertDialogTrigger>
    <AlertDialogContent
      @interact-outside="dismissTitlebar"
      @focus-outside="dismissTitlebar"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>
          <slot name="dialog-title">请注意</slot>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="dialog-description">请确认是否继续进行操作</slot>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          <slot name="cancel">取消</slot>
        </AlertDialogCancel>
        <AlertDialogAction as-child>
          <slot name="action">确定</slot>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
