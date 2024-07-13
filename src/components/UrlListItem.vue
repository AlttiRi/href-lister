<template>
  <tr
    @pointerenter="triggerVisitedMs"
    :data-index="index + 1"
    :class="{
      'clicked': isClicked,
      'last-clicked': isLastClicked,
    }"
    class="list-item-row"
    data-comp="UrlListItem"
    ref="htmlCompRef"
  >
    <td class="col-9 nowrap-text-ceil url url-cell">
      <span class="nowrap-text-ceil-content">
        <span
          class="info-dot"
          :class="{
            ['has-comment']: ue.inputComment,
            visited: visitedMs > 0,
            [timePassedClass]: true,
          }"
          :title="titleText"
          @contextmenu.prevent="unmarkUrlAsClicked"
          @pointerdown="removeVisitOnMMB"
        ></span>
        <a
          class="url link-primary"
          target="_blank" rel="noreferrer noopener"
          :href="ue.url"
          :title="ue.inputComment"
          @click="markUrlAsClicked"
          @pointerup="markUrlAsClickedOnMMBClick"
        >{{ue.url}}</a>
      </span>
      <UrlListItemTags class="tags" :ue="ue"/>
    </td>
    <td
      class="col-3 comment nowrap-text-ceil"
      @dblclick="toggleMessageEditPopup"
      :class="{
        [commentCssClass]: commentCssClass
      }"
    >
      <span class="comment-content nowrap-text-ceil-content no-dbl-click-select">{{comment || "&nbsp;"}}</span>
    </td>
  </tr>
</template>

<script setup lang="ts">
import {computed, toRaw, ComputedRef, ref, onBeforeUnmount} from "vue";
import {formatDate, throttle} from "@alttiri/util-js";
import {
  clickedUrls,
  NEVER_VISITED_TIME,
  messagePopupEntry,
  lastClickedInfo,
} from "../core/core";
import {timeAgo} from "../core/util";
import {RefTriggerTimer} from "../core/relative-time-trigger";
import {UrlEntry} from "../core/url-entry";
import UrlListItemTags from "./UrlListItemTags.vue";

const props = defineProps<{ue: UrlEntry, index: number}>();


const visitedMs: ComputedRef<number> = computed(() => props.ue.visited || NEVER_VISITED_TIME);

function removeUrlVisit() {
  void props.ue.delVisited();
}

function visitUrl() {
  const msNow = Date.now();
  void props.ue.setVisited(msNow);
}

function removeVisitOnMMB(event: PointerEvent) { // <.info-dot> @pointerdown
  const MIDDLE_BUTTON = 1;
  if (event.button === MIDDLE_BUTTON) {
    event.preventDefault();
    removeUrlVisit();
  }
}

const commentCssClass = computed(() => {
  if (props.ue.comment !== undefined) {
    if (!props.ue.inputComment) {
      return "comment-from-store";
    }
    if (props.ue.comment !== props.ue.inputComment) {
      return "comment-from-store-over";
    }
  }
  return "";
});

const comment = computed(() => {
  if (props.ue.comment !== undefined) {
    return props.ue.comment.trim();
  }
  return props.ue.inputComment;
});


function toggleMessageEditPopup() { // <td> @dblclick
  if (toRaw(messagePopupEntry.value) === toRaw(props.ue)) {
    messagePopupEntry.value = null;
  } else {
    messagePopupEntry.value = props.ue;
  }
}

const htmlCompRef = ref<HTMLTableRowElement>();
const isClicked = computed(() => {
  return clickedUrls.value.has(props.ue.url);
});
function markUrlAsClicked() { // <a.url> @click
  clickedUrls.value.add(props.ue.url);
  visitUrl();
  lastClickedInfo.value = {
    entry: props.ue,
    index: props.index,
    elem:  htmlCompRef.value as HTMLTableRowElement,
  };
}
function markUrlAsClickedOnMMBClick(event: PointerEvent) { // <a.url> @pointerup
  const MIDDLE_BUTTON = 1;
  if (event.button !== MIDDLE_BUTTON) {
    return;
  }
  const activeElement = (document.getRootNode() as Document).activeElement;
  if (activeElement !== event.currentTarget) {
    return;
  }
  markUrlAsClicked();
}
function unmarkUrlAsClicked() { // <.info-dot> @contextmenu.prevent
  clickedUrls.value.delete(props.ue.url);
}
const isLastClicked = computed(() => {
  const lcInfo = lastClickedInfo.value;
  if (!lcInfo) {
    return false;
  }
  return props.index === lcInfo.index && props.ue.isEquals(lcInfo.entry);
});

onBeforeUnmount(() => {
  if (isLastClicked.value) {
    lastClickedInfo.value = null;
  }
});


// Recalculates `timePassedClass`, `visitedText` based on `visitedMs`
const refTrigger = new RefTriggerTimer(visitedMs);
function recalculateComponentState() {
  refTrigger.forceTrigger();
}
const triggerVisitedMs = throttle(recalculateComponentState, 2000); // <tr> @pointerenter

const titleText = computed(() => {
  let text: string = `№ ${props.index + 1}.\n`;
  if (visitedMs.value < 0) {
    text += "never clicked";
  } else {
    text += formatVisitedMs(visitedMs.value);
  }
  if (props.ue.initialVisited && props.ue.initialVisited !== visitedMs.value) {
    return `${text}\n${formatVisitedMs(props.ue.initialVisited)}`;
  }
  return text;
});
function formatVisitedMs(value: number) {
  return timeAgo(value) + " — " + formatDate(value, "YYYY.MM.DD HH:mm:SS", false);
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
  if (diff < 60 * 60)  { return "minute-60"; }
  if (diff < 3600 * 2)  { return "hour-2";  }
  if (diff < 3600 * 4)  { return "hour-4";  }
  if (diff < 3600 * 8)  { return "hour-8";  }
  if (diff < 3600 * 14) { return "hour-14"; }
  if (diff < 3600 * 24) { return "day-1";   }
  if (diff < 86400 * 7) { return "day-7";   }
  if (diff < 86400 * 30)  { return "month-1"; }
  if (diff < 2592000 * 3) { return "month-3"; }
  if (diff < 2592000 * 6) { return "month-6"; }
  return "long-ago";
}
</script>

<style scoped>
.url-cell {
  position: relative;
}
td {
  align-items: center;
}

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
  background-color: #0000000a;
}
.clicked.last-clicked {
  background-color: #0000000e;
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
.minute-2  { background-color: #6bc841; }
.minute-5  { background-color: #88cf3f; }
.minute-10 { background-color: #a3d53e; }
.minute-30 { background-color: #bcdb3c; }
.minute-45 { background-color: #d4e139; }
.minute-60 { background-color: #ece737; }
.hour-2  { background-color: #42c1b2; }
.hour-4  { background-color: #4ba4b6; }
.hour-8  { background-color: #4b88b9; }
.hour-14 { background-color: #487abb; }
.day-1   { background-color: #446cbc; }
.day-7   { background-color: #5b5cb6; }
.month-1 { background-color: #6a49b1; }
.month-3 { background-color: #703fae; }
.month-6 { background-color: #7633ab; }
.long-ago { background-color: gray; }

tr:hover, tr.hover {
  box-shadow: 0 0 1px gray;
}

.highlighted-1 {
  box-shadow: 0 0 1px gray;
}
.highlighted-2 {
  box-shadow: 0 0 2px gray;
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
.last-clicked > td.url {
  border-left: 2px solid #b3bfff;
}
</style>
