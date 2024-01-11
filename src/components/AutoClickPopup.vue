<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {makeMovable, makeResizable, storeStateInLS} from "../core/make-fancy";
import {resetAutoClickPopupRequested} from "../core/core";

const popupElem  = ref<HTMLElement>();
const headerElem = ref<HTMLElement>();


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
      id: "href-lister-popup-move-state",
      reset: resetAutoClickPopupRequested.value,
    }),
  });
  header.addEventListener("pointerdown", event => {
    popup.focus();
  }, {passive: true});

  makeResizable(popup, {
    minH: parseInt(getComputedStyle(popup).height),
    minW: parseInt(getComputedStyle(popup).width),
    ...storeStateInLS({
      restore: true,
      id: "href-lister-popup-resize-state",
      reset: resetAutoClickPopupRequested.value,
    }),
  });

  resetAutoClickPopupRequested.value = false;
  stopWE();
});


</script>

<template>
  <div class="popup-root" data-comp="AutoClickPopup">
    <div class="popup" ref="popupElem" tabindex="-1" @focus="console.log">
      <div class="popup-header p-1" ref="headerElem">Auto Clicker</div>
      <div class="popup-content ">
        <div class="btn-group m-1" role="group" aria-label="Basic example">
          <button class="btn btn-primary">Start</button>
          <button class="btn btn-secondary">Pause</button>
          <button class="btn btn-secondary">Stop</button>
        </div>
        <div class="input-wrap m-1">
          <input class="form-control" type="number" value="5000">
        </div>
        <div class="m-1">
          <div>123456</div>
          <div>qwerty</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
