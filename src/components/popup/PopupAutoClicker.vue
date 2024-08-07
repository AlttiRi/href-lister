<script setup lang="ts">
import {ref, watch} from "vue";
import {sleep, sleepEx} from "@alttiri/util-js";
import {appendable, clickerSettings, editable, lastClickedInfo} from "@/core/core";
import FancyPopup from "@/components/popup/FancyPopup.vue";


const headerElem = ref<HTMLElement | null>(null);

const {delay, count} = clickerSettings;


type ClickingState = "ready" | "started" | "paused" | "stopped";
const state = ref<ClickingState>("ready");
const lastClickedIndex = ref(0);
let controller = new AbortController();

watch(state,() => {
  if (state.value === "ready") {
    appendable.value = editable.value = true;
  } else if (state.value === "started") {
    appendable.value = editable.value = false;
  } else if (state.value === "paused") {
    appendable.value = true;
  }
});

async function startClicking() {
  console.log("startClicking");
  const anchors = [...document.querySelectorAll("a.url")] as HTMLAnchorElement[];
  const to = count.value === 0 ? anchors.length : Math.min(anchors.length, count.value + lastClickedIndex.value);
  const isPart = to < anchors.length;
  state.value = "started";
  while (lastClickedIndex.value < to) {
    const a = anchors[lastClickedIndex.value];
    const urlListItem = a.closest(`[data-component="UrlListItem"]`)!;
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
  if (lastClickedIndex.value === 0) {
    reason = "stopped";
  }
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


let startElem: Element | null;
function onPointerenter() {
  if (lastClickedInfo.value && state.value !== "ready") {
    const nextElem = lastClickedInfo.value.elem.nextElementSibling;
    if (nextElem) {
      nextElem.classList.add("highlighted-1");
      startElem = nextElem;
    }
  } else {
    const firstElem = document.querySelector(`[data-component="UrlListItem"]`);
    if (firstElem) {
      firstElem.classList.add("highlighted-1");
      startElem = firstElem;
    }
  }
}
function onPointerleave() {
  if (startElem) {
    startElem.classList.remove("highlighted-1");
    startElem = null;
  }
}

</script>

<template>
  <FancyPopup data-slot-component="PopupAutoClicker"
              id="auto-clicker" :header="headerElem"
  >
    <div class="popup-header p-1" ref="headerElem">Auto Clicker</div>
    <div class="popup-content">
      <div class="btn-group p-1 container">
        <button
          class="btn btn-primary col-4"
          @click="startClicking"
          @pointerenter="onPointerenter"
          @pointerleave="onPointerleave"
          :disabled="!(state === 'ready' || state === 'paused')"
        >{{ state === "ready" || !lastClickedIndex ? "Start" : "Next" }}</button>
        <button
          class="btn btn-secondary col-4"
          :disabled="state !== 'started'"
          @click="interrupt('paused')"
        >Pause</button>
        <button
          class="btn btn-secondary col-4"
          :disabled="!lastClickedIndex"
          @click="stop"
        >{{ state === "paused" ? "Reset" : "Stop" }}</button>
      </div>

      <div class="div-wrap">
        <label class="p-1 pt-0 col-12">
          <span class="input-group">
            <span class="input-group-text col-3">Delay</span>
            <input
              title="Click delay (seconds)"
              class="form-control"
              type="number"
              v-model="delay"
            >
          </span>
        </label>
      </div>

      <div class="div-wrap">
        <label class="p-1 pt-0 col-12">
          <span class="input-group">
            <span class="input-group-text col-3">Count</span>
            <input
              title="Count"
              class="form-control"
              type="number"
              v-model="count"
            >
          </span>
        </label>
      </div>

<!--      <div class="div-wrap">-->
<!--        <label class="p-1 pt-0 col-12">-->
<!--            <input-->
<!--              title="Only un-clicked"-->
<!--              class="form-check-input"-->
<!--              type="checkbox"-->
<!--            >-->
<!--            <span class="p-1 pt-0">Only un-clicked</span>-->
<!--        </label>-->
<!--      </div>-->

    </div>
  </FancyPopup>
</template>

<style scoped>

</style>
