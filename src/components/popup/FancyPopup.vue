<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {resetPopupAutoClickerRequested} from "@/core/core";
import {makeMovable, storeStateInLS}    from "@/core/make-fancy";


const props = defineProps<{
  id: string;
  header?: HTMLElement | null;
}>();

const popupElem  = ref<HTMLElement>();
const headerElem = ref<HTMLElement>();

watchEffect(() => {
  if (props.header) {
    headerElem.value = props.header;
  }
});

const stopWE = watchEffect(() => {
  if (!popupElem.value || !headerElem.value) {
    return;
  }
  const popup  = popupElem.value;
  const header = headerElem.value;

  makeMovable(popupElem.value, {
    handle: header,
    ...storeStateInLS({
      restore: true,
      id: `href-lister-${props.id}-popup-move-state`,
      reset: resetPopupAutoClickerRequested.value,
    }),
  });
  header.addEventListener("pointerdown", event => {
    popup.focus();
  }, {passive: true});

  resetPopupAutoClickerRequested.value = false;
  stopWE();
});


const focus = ref(false);
let blurTimerId = 0;
function focusin() {
  focus.value = true;
  setTimeout(() => clearTimeout(blurTimerId));
}
function focusout() {
  blurTimerId = window.setTimeout(() => {
    focus.value = false;
  }, 250);
}
</script>

<template>
  <div data-component="FancyPopup" class="popup-root">
    <div
      class="popup" tabindex="-1"
      ref="popupElem"
      @focusin="focusin"
      @focusout="focusout"
      :class="{
        focus
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-root {
  display: flex;
  margin-top: 40px;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99999;
  font-size: 16px;
  font-family: serif;
  > * {
    pointer-events: all;
  }
}

.popup {
  border: grey 1px solid;
  background-color: white;
  z-index: 10;
  :deep(.popup-header) {
    background-color: #e9ecef;
  }
}

.popup[tabindex] {
  outline: none;
}

.popup.focus {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.popup {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.4s;
}
</style>
