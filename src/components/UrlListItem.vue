<template>
  <td :class="{clicked}">
    <span class="info-dot"
          :class="{
            ['has-comment']: ue.comment,
            visited: visitedMs > 0
          }"
          :title="visitedText"
          @contextmenu.prevent="onInfoDotContextMenu"
          @pointerenter="onPointerEnter"
          @pointerdown="onPointerDown"
    ></span>
    <a class="url link-primary" target="_blank" rel="noreferrer noopener"
       :href="ue.url"
       :title="ue.comment"
       @click="onClick"
    >{{ue.url}}</a>
  </td>
</template>

<script setup lang="ts">
import {set, get, del, createStore} from "idb-keyval";
import {UrlEntry} from "./core";
import {ref, onMounted, computed, triggerRef} from "vue";
import {formatDate} from "@alttiri/util-js";

const props = defineProps<{ue: UrlEntry}>();
const url = props.ue.url;

const store = createStore("HrefLister", "Visits");
const visitedMs = ref(-1);
onMounted(async () => {
  visitedMs.value = (await getVisited()) || -2;
  console.log(visitedMs.value);
});
const visitedText = computed(updateVisitedTitle);
function updateVisitedTitle() {
  if (visitedMs.value < 0) {
    return "never clicked";
  }
  return formatVisitedMs(visitedMs.value);
}

async function updateVisited() {
  const v = Date.now();
  await set(url, v, store);
  visitedMs.value = v;
}
function getVisited() {
  return get(url, store);
}
async function removeVisited() {
  await del(url, store);
  visitedMs.value = -2;
}

function formatVisitedMs(value: number) {
  return formatDate(value, "YYYY.MM.DD HH:mm:SS", false) + " — " + timeAgo(value);
}

function timeAgo(ms: number) {
  const now = Date.now();
  const diff = Math.trunc((now - ms) / 1000);
  if (diff < 60) {
    return `${diff} second${diff > 1 ? "s" : ""} ago`;
  }

  if (diff < 60 * 60) {
    const m = Math.trunc(diff / 60);
    return `${m} minute${m > 1 ? "s" : ""} ago`;
  }
  if (diff < 60 * 60 * 24) {
    const m = Math.trunc(diff / 60);
    const h = Math.trunc(diff / 60 / 60);
    return `${h}:${m} ago`;
  }
  return Math.trunc(diff / 60 / 60 / 24) + " days ago";
}

const clicked = ref(false)
function onClick() {
  clicked.value = true;
  updateVisited();
}

function onInfoDotContextMenu() {
  clicked.value = !clicked.value;
}

function onPointerEnter() { // todo throttle
  triggerRef(visitedMs);
}
function onPointerDown(event: PointerEvent) {
  const MIDDLE_BUTTON = 1;
  if (event.button === MIDDLE_BUTTON) {
    event.preventDefault();
    removeVisited();
    console.log("xxx");
  }
}


</script>

<style scoped>
a {
  margin-left: 4px;
  text-decoration: none;
  vertical-align: middle;
}
a:visited {
  color: #6f42c1 !important;
}
.clicked {
  background-color: #0000000f;
}
.info-dot {
  height: 16px;
  width: 16px;
  background-color: #0000000f;
  vertical-align: middle;
  display: inline-block;
  border-radius: 8px;
  border: 1px solid white;
}
.has-comment {
  border: 1px solid gray;
}
.visited {
  background-color: #dee2e6;
}
</style>
