<template>
  <tr :class="{clicked}"
      @pointerenter="onPointerEnter"
  >
    <td class="col-9 nowrap-text-ceil url"
        :class="{
          'last-clicked': isLastClicked,
        }"
    >
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
    <td class="col-3 comment nowrap-text-ceil"
        @dblclick="onDblClick"
        :class="{
          [commentCssClass]: commentCssClass
        }"
    >
      <span class="comment-content nowrap-text-ceil-content no-dbl-click-select" >{{ue.commentFromStore || ue.comment || "&nbsp;"}}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {lastClickedEntry, popupEntry, UrlEntry} from "./core";
import {ref, onMounted, computed, toRaw, triggerRef, onUpdated, onUnmounted, watch} from "vue";
import {formatDate} from "@alttiri/util-js";
import {throttle} from "./util";
import {getVisit, loadComment, removeVisit, setVisit} from "./state-store";

const props = defineProps<{ue: UrlEntry}>();
const url = props.ue.url;

const visitedMs = ref(-1);
onMounted(loadState);
onUpdated(loadState);

async function loadState() {
  const visitedMsPromise = getVisit(url);
  const commentPromise = loadComment(url);

  visitedMs.value = (await visitedMsPromise) || -2;

  const savedComment = await commentPromise;
  if (savedComment) {
    props.ue.commentFromStore = savedComment;
  }
}

function removeVisitStore() {
  void removeVisit(url);
  visitedMs.value = -2;
}
function updateVisitStore() {
  const msNow = Date.now();
  void setVisit(url, msNow);
  visitedMs.value = msNow;
}

const visitedText = computed(updateVisitedTitle);
function updateVisitedTitle() {
  if (visitedMs.value < 0) {
    return "never clicked";
  }
  return formatVisitedMs(visitedMs.value);
}

const commentCssClass = computed(() => {
  if (props.ue.commentFromStore && !props.ue.comment) {
    return "comment-from-store"
  }
  if (props.ue.commentFromStore && props.ue.commentFromStore !== props.ue.comment) {
    return "comment-from-store-over";
  }
});

function onDblClick() {
  if (toRaw(popupEntry.value) === toRaw(props.ue)) {
    popupEntry.value = null;
  } else {
    popupEntry.value = props.ue;
  }
}

const timePassedClass = computed(() => getTimePassedClass(visitedMs.value));
function getTimePassedClass(ms: number) {
  if (ms < 0) { return "never-clicked"; }
  const now = Date.now();
  const diff = Math.trunc((now - ms) / 1000);
  if (diff < 60)       { return "minute-1";  }
  if (diff < 60 *  2)  { return "minute-2";  }
  if (diff < 60 *  5)  { return "minute-5";  }
  if (diff < 60 * 10)  { return "minute-10"; }
  if (diff < 60 * 30)  { return "minute-30"; }
  if (diff < 60 * 45)  { return "minute-45"; }
  if (diff < 60 * 60)   { return "hour-1";  }
  if (diff < 3600 * 2)  { return "hour-2";  }
  if (diff < 3600 * 8)  { return "hour-8";  }
  if (diff < 3600 * 14) { return "hour-14"; }
  if (diff < 3600 * 24) { return "day-1";   }
  if (diff < 86400 * 7) { return "day-7";   }
  if (diff < 86400 * 30)  { return "month-1"; }
  if (diff < 2592000 * 3) { return "month-3"; }
  if (diff < 2592000 * 6) { return "month-6"; }
  return "long-ago";
}


watch(visitedMs,(value) => { // does not trigger on `triggerRef` in comparison with `watchEffect`
  if (value > 0) {
    setTimer();
  }
});
onUnmounted(clearTimer);

let timerId: number;
const MINUTE = 1000 * 60;
function setTimer() {
  clearTimer();
  const diff = Date.now() - visitedMs.value;
  let time: number;
  if (diff < MINUTE * 10) {
    time = MINUTE;
  } else if (diff < MINUTE * 60) {
    time = MINUTE * 10;
  } else if (diff < MINUTE * 60 * 24) {
    time = MINUTE * 60;
  } else {
    return;
  }
  console.log("setTimeout", time);
  timerId = setTimeout(() => {
    triggerRef(visitedMs);
    setTimer();
  }, time);
}
function clearTimer() {
  clearTimeout(timerId);
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
  updateVisitStore();
  lastClickedEntry.value = toRaw(props.ue);
}
const isLastClicked = computed(() => {
  return toRaw(lastClickedEntry.value) === toRaw(props.ue);
});

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
    removeVisitStore();
  }
}


</script>

<style scoped>

.nowrap-text-ceil {
  display: inline-flex;
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
/*.has-comment {*/
/*  border: 1px solid gray;*/
/*}*/
.visited {
  background-color: #dee2e6;
}

/*.never-clicked { background-color: #0000000f; }*/
.minute-1  { background-color: #46c142; }
.minute-2  { background-color: #7dcd3e; }
.minute-5  { background-color: #99d43c; }
.minute-10 { background-color: #b4da3a; }
.minute-30 { background-color: #d0e038; }
.minute-45 { background-color: #ece737; }
.hour-1  { background-color: #42c1b2; }
.hour-2  { background-color: #4ba4b6; }
.hour-8  { background-color: #4b88b9; }
.hour-14 { background-color: #487abb; }
.day-1   { background-color: #446cbc; }
.day-7   { background-color: #5b5cb6; }
.month-1 { background-color: #6a49b1; }
.month-3 { background-color: #703fae; }
.month-6 { background-color: #7633ab; }
.long-ago { background-color: gray; }

tr:hover {
  box-shadow: 0 0 1px gray;
}

.no-dbl-click-select:active {
  user-select: none;
}

.comment {
  border-right: 2px solid transparent;
}
.comment-from-store {
  border-right: 2px solid rgb(230, 244, 255);
}
.comment-from-store-over {
  border-right: 2px solid #6f42c1;
}

.url {
  border-left: 2px solid transparent;
}
.url.last-clicked {
  border-left: 2px solid #b3bfff;
}
</style>
