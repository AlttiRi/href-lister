<template>
  <tr :class="{clicked}"
      @pointerenter="onPointerEnter"
  >
    <td class="col-9 nowrap-text-ceil">
      <span class="nowrap-text-ceil-content">
        <span class="info-dot"
              :class="{
                ['has-comment']: ue.comment,
                visited: visitedMs > 0,
                [timePassedClass]: true,
              }"
              :title="visitedText"
              @contextmenu.prevent="onInfoDotContextMenu"
              @pointerdown="onPointerDown"
        ></span>
        <a class="url link-primary" target="_blank" rel="noreferrer noopener"
           :href="ue.url"
           :title="ue.comment"
           @click="onClick"
        >{{ue.url}}</a>
      </span>
    </td>
    <td class="col-3 comment nowrap-text-ceil">
      <span class="comment-content nowrap-text-ceil-content">{{ue.comment}}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {set, get, del, createStore} from "idb-keyval";
import {UrlEntry} from "./core";
import {ref, onMounted, computed, triggerRef} from "vue";
import {formatDate} from "@alttiri/util-js";
import {throttle} from "./util";

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


const timePassedClass = computed(() => {
  if (visitedMs.value < 0) {
    return "never-clicked";
  }
  const now = Date.now();
  const diff = Math.trunc((now - visitedMs.value) / 1000);
  if (diff < 60) {
    return "minute-1";
  }
  if (diff < 60 * 2) {
    return "minute-2";
  }
  if (diff < 60 * 5) {
    return "minute-5";
  }
  if (diff < 60 * 10) {
    return "minute-10";
  }
  if (diff < 60 * 30) {
    return "minute-30";
  }
  if (diff < 60 * 60) {
    return "hour-1";
  }
  if (diff < 60 * 60 * 2) {
    return "hour-2";
  }
  if (diff < 60 * 60 * 24) {
    return "day-1";
  }
  return "day-n";
});


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
  return timeAgo(value) + " — " + formatDate(value, "YYYY.MM.DD HH:mm:SS", false);
}

function timeAgo(ms: number) {
  const now = Date.now();
  const secs = Math.trunc((now - ms) / 1000);
  if (secs < 60) {
    return `${secs} second${secs > 1 ? "s" : ""} ago`;
  }

  if (secs < 60 * 60) {
    const m = Math.trunc(secs / 60);
    return `${m} minute${m > 1 ? "s" : ""} ago`;
  }
  if (secs < 60 * 60 * 24) {
    const m = Math.trunc(secs / 60 % 60).toString().padStart(2, "0");
    const h = Math.trunc(secs / 60 / 60);
    return `${h}:${m} ago`;
  }
  return Math.trunc(secs / 60 / 60 / 24) + " days ago";
}

const clicked = ref(false)
function onClick() {
  clicked.value = true;
  updateVisited();
}

function onInfoDotContextMenu() {
  clicked.value = !clicked.value;
}
const onPointerEnter = throttle(_onPointerEnter, 1000);
function _onPointerEnter() {
  triggerRef(visitedMs);
}
function onPointerDown(event: PointerEvent) {
  const MIDDLE_BUTTON = 1;
  if (event.button === MIDDLE_BUTTON) {
    event.preventDefault();
    removeVisited();
  }
}


</script>

<style scoped>

.nowrap-text-ceil {
  display: inline-grid;
}
.nowrap-text-ceil-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

a {
  margin-left: 4px;
  text-decoration: none;
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
  margin-bottom: -3px;
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

.minute-1 {
  background-color: #46c142;
}
.minute-2 {
  background-color: #62c142;
}
.minute-5 {
  background-color: #92c142;
}
.minute-10 {
  background-color: #49bd64;
}
.minute-30 {
  background-color: #42c17d;
}
.hour-1 {
  background-color: #42c1b2;
}
.hour-2 {
  background-color: #42b2c1;
}
.day-1 {
  background-color: #4275c1;
}
.day-n {
  background-color: #4642c1;
}


</style>
