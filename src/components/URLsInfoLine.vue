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
    <div class="URLsInfoLine--comp">
        <span title="URLs count, (unique one)">{{urlsCount.count}} ({{urlsCount.uniqueCount}})</span>
        <span class="grey"> — </span>
        <span title="URLs hash">
            <span class="grey">#</span>{{hash}}
        </span>
        <span v-if="clickedUrlsCount.count">
            <span class="sep"> — </span>
            <span title="Clicked URLs count, (unique one)">[ {{clickedUrlsCount.count}} ({{clickedUrlsCount.uniqueCount}}) ]</span>
        </span>
    </div>
</template>

<style scoped>
.sep {
    color: grey;
}
</style>
