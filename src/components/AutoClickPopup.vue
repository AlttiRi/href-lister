<script setup lang="ts">
import {reactive, ref, toRefs, watch, watchEffect} from "vue";
import {makeMovable, storeStateInLS} from "../core/make-fancy";
import {resetAutoClickPopupRequested} from "../core/core";
import {sleep} from "@alttiri/util-js";
import {sleepEx} from "../core/util";

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

  resetAutoClickPopupRequested.value = false;
  stopWE();
});


function useLocalStorageObject<T extends object>(itemName: string, defaultValue: T) {
  const lsValue: string | null = localStorage.getItem(itemName);
  const object = reactive(lsValue ? JSON.parse(lsValue) : defaultValue);
  watch(object,() => {
    localStorage.setItem(itemName, JSON.stringify(object));
  });
  return object;
}

const {delay, count} = toRefs(useLocalStorageObject("href-lister-clicker-settings", {
  delay: 1,
  count: 0,
}));



type ClickingState = "ready" | "started" | "paused" | "stopped";
const state = ref<ClickingState>("ready");
const lastClickedIndex = ref(0);
let controller = new AbortController();

async function startClicking() {
  console.log("startClicking");
  const anchors = [...document.querySelectorAll("a.url")] as HTMLAnchorElement[];
  const to = count.value === 0 ? anchors.length : Math.min(anchors.length, count.value + lastClickedIndex.value);
  const isPart = to < anchors.length;
  state.value = "started";
  while (lastClickedIndex.value < to) {
    const a = anchors[lastClickedIndex.value];
    const urlListItem = a.closest(`[data-comp="UrlListItem"]`)!;
    urlListItem.classList.add("hover");
    await sleepEx(delay.value * 1000, controller.signal);
    urlListItem.classList.remove("hover");
    if (state.value === "started") {
      lastClickedIndex.value++;
      a.dispatchEvent(new MouseEvent("click"));
      await sleep();
    } else if (state.value === "paused") {
      state.value = "paused";
      return;
    } else if (state.value === "stopped") {
      lastClickedIndex.value = 0;
      state.value = "ready";
      return;
    }
  }
  if (!isPart) {
    lastClickedIndex.value = 0;
    state.value = "ready";
  } else {
    state.value = "paused";
  }
}

function interrupt(reason: "paused" | "stopped") {
  state.value = reason;
  controller.abort(reason);
  controller = new AbortController();
}
function stop() {
  if (state.value === "started") {
    interrupt("stopped");
    return;
  }
  lastClickedIndex.value = 0;
  state.value = "ready";
}

const focus = ref(false);
let blurTimerId = 0;
function focusin() {
  focus.value = true;
  setTimeout(() => clearTimeout(blurTimerId));
}
function focusout() {
  blurTimerId = setTimeout(() => {
    focus.value = false;
  }, 250);
}

</script>

<template>
  <div class="popup-root" data-comp="AutoClickPopup">
    <div
      class="popup" tabindex="-1"
      ref="popupElem"
      @focusin="focusin"
      @focusout="focusout"
      :class="{
        focus
      }"
    >
      <div class="popup-header p-1" ref="headerElem">Auto Clicker</div>
      <div class="popup-content ">
        <div class="btn-group p-1 container" role="group" aria-label="Basic example">
          <button
            class="btn btn-primary col-4"
            @click="startClicking"
            :disabled="!(state === 'ready' || state === 'paused')"
          >{{ state === "ready" || !lastClickedIndex ? "Start" : "Next"}}</button>
          <button
            class="btn btn-secondary col-4"
            :disabled="state !== 'started'"
            @click="interrupt('paused')"
          >Pause</button>
          <button
            class="btn btn-secondary col-4"
            :disabled="!lastClickedIndex"
            @click="stop"
          >Stop</button>
        </div>

        <div class="col-12">
          <label class="m-1 mt-0">
            <span class="input-group">
              <span class="input-group-text">Delay</span>
              <input
                title="Click delay (seconds)"
                class="form-control "
                type="number"
                v-model="delay"
              >
            </span>
          </label>
        </div>

        <div class="col-12">
          <label class="m-1 mt-0">
            <span class="input-group">
              <span class="input-group-text">Count</span>
              <input
                title="Count"
                class="form-control "
                type="number"
                v-model="count"
              >
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
