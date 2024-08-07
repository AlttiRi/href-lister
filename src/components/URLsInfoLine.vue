<script setup lang="ts">
import {watchEffect} from "vue";
import {sleep} from "@alttiri/util-js";
import {clickedUrlsCount, hash, urlsCount} from "@/core/title-handler";
import {lastClickedInfo}  from "@/core/core";
import {ordinalIndicator} from "@/core/util";


watchEffect(() => {
    const {count, uniqueCount} = urlsCount.value;
    if (!count) {
        document.title = "HrefLister";
        return;
    }
    document.title = `HrefLister — ${formatCounts(count, uniqueCount)} — #${hash.value}`;
    if (clickedUrlsCount.value.count) {
        const {count, uniqueCount} = clickedUrlsCount.value;
        document.title = `${document.title} — [ ${formatCounts(count, uniqueCount)} ]`;
    }
});

function formatCounts(count: number, uniqueCount: number): string {
    let countText = count.toString();
    const hasDuplicates = count !== uniqueCount;
    if (hasDuplicates) {
        countText = `${countText} (${uniqueCount})`;
    }
    return countText;
}

async function scrollToListItem() {
  if (!lastClickedInfo.value) {
    return;
  }
  const elem = lastClickedInfo.value.elem;
  elem.scrollIntoView({block: "center"});
  elem.classList.add("highlighted-2");
  await sleep(800);
  elem.classList.remove("highlighted-2");
}

function onPointerenter() {
  if (lastClickedInfo.value) {
    lastClickedInfo.value.elem.classList.add("highlighted-1");
  }
}
function onPointerleave() {
  if (lastClickedInfo.value) {
    lastClickedInfo.value.elem.classList.remove("highlighted-1");
  }
}

</script>

<template>
  <div data-component="URLsInfoLine">
    <span>
       <span title="URLs count">{{urlsCount.count}}</span>
       <span
         title="URLs count (unique)"
         v-if="urlsCount.count !== urlsCount.uniqueCount"
       > ({{urlsCount.uniqueCount}})</span>
    </span>
    <span class="grey"> — </span>
    <span title="URLs hash">
      <span class="grey">#</span>
      <span class="urls-hash">{{hash}}</span>
    </span>
    <span v-if="clickedUrlsCount.count">
      <span class="grey"> — </span>
      <span>
        <span class="grey">[</span>
        <span class="clicked-count">
          <span title="Clicked URLs count">{{clickedUrlsCount.count}}</span>
          <span
            title="Clicked URLs count (unique)"
            v-if="clickedUrlsCount.count !== clickedUrlsCount.uniqueCount"
          > ({{clickedUrlsCount.uniqueCount}})</span>
        </span>
        <span class="grey">]</span>
      </span>
    </span>
    <span
      v-if="lastClickedInfo"
      @click="scrollToListItem"
      @pointerenter="onPointerenter"
      @pointerleave="onPointerleave"
    >
      <span class="grey"> — </span>
      <span
        class="grey"
        :title="'Last clicked URL index\n' + lastClickedInfo.entry.url">
        {{ordinalIndicator(lastClickedInfo.index)}}
      </span>
    </span>
  </div>
</template>

<style scoped>
.grey, .urls-hash {
    color: #777;
}
.clicked-count {
  padding: 0 3px;
}
</style>
