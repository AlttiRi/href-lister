<script setup lang="ts">
import {watchEffect} from "vue";
import {clickedUrlsCount, hash, urlsCount} from "../core/title-handler";

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
    const hasDuplicates = uniqueCount !== length;
    if (hasDuplicates) {
        countText = `${countText} (${uniqueCount})`;
    }
    return countText;
}
</script>

<template>
  <div data-comp="URLsInfoLine">
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
        <span title="Clicked URLs count">{{clickedUrlsCount.count}}</span>
        <span
          title="Clicked URLs count (unique)"
          v-if="clickedUrlsCount.count !== clickedUrlsCount.uniqueCount"
        > ({{clickedUrlsCount.uniqueCount}})</span>
        <span class="grey">]</span>
      </span>
    </span>
  </div>
</template>

<style scoped>
.grey, .urls-hash {
    color: #777;
}
</style>
