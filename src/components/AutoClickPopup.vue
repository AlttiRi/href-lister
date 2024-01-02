<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {makeMovable, makeResizable, storeStateInLS} from "../core/make-fancy";
import {showAutoClickPopup} from "../core/core";


const popupElem = ref<HTMLElement>();
const headerElem = ref<HTMLElement>();

watchEffect(() => {
  if (!popupElem.value || !headerElem.value) {
    return;
  }
  makeMovable(popupElem.value, {
    handle: headerElem.value,
    ...storeStateInLS({
      restore: true,
      id: "href-lister-popup-move-state",
    }),
  });
  makeResizable(popupElem.value, {
    minH: parseInt(getComputedStyle(popupElem.value).height),
    minW: parseInt(getComputedStyle(popupElem.value).width),
    ...storeStateInLS({
      restore: true,
      id: "href-lister-popup-resize-state",
    }),
  });
});

</script>

<template>
  <Teleport to="body" v-if="showAutoClickPopup">
    <div ref="popupElem" class="popup" data-comp="AutoClickPopup">
      <div ref="headerElem" class="header">Header</div>
      <div>Popup</div>
    </div>
  </Teleport>
</template>

<style scoped>
.popup {
  border: #4b88b9 1px solid;
  background-color: #4ba4b6;
  z-index: 10;
}
.header {
  background-color: #5b5cb6;
}
</style>
