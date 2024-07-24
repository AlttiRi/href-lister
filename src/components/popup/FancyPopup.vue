<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {getPopupEnh, makeFocusable} from "@alttiri/popup-enhance";
import {resets} from "@/core/core";

const {makeMovableEx} = getPopupEnh("href-lister");

const props = defineProps<{
  id: string;
  header: HTMLElement | null;
}>();

const popupElem  = ref<HTMLElement>();

const stopWE = watchEffect(() => {
  if (!popupElem.value || !props.header) {
    return;
  }
  const popup = popupElem.value;
  const handle = props.header;
  const {reset} = makeMovableEx(popup, props.id, {handle});
  resets[props.id] = reset;
  makeFocusable(popup, handle);
  stopWE();
});
</script>

<template>
  <div data-component="FancyPopup" class="popup-root">
    <div class="popup" ref="popupElem">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup :deep(.popup-header) {
  background-color: #e9ecef;
}
</style>
