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
import {ref, onMounted, computed, toRaw, triggerRef, onUpdated} from "vue";
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
  background-color: #96bd49;
}
.minute-30 {
  background-color: #a5c142;
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
