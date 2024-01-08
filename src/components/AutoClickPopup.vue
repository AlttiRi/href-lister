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
    <div class="popup-root" data-comp="AutoClickPopup">
      <div class="popup" ref="popupElem">
        <div class="popup-header" ref="headerElem">Header</div>
        <div>Popup</div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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
}
.popup-root > * {
  pointer-events: all;
}

.popup {
  border: #4b88b9 1px solid;
  background-color: #4ba4b6;
  z-index: 10;
}
.popup-header {
  background-color: #5b5cb6;
}
</style>
