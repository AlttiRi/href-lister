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

const slotProps = {
  headerElem,
};

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
      <slot :fancyPopupSlotProps="slotProps"></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
