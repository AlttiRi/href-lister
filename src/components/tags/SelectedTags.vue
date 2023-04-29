<script setup lang="ts">
import {UrlInfo} from "../../core/url-info-entry";

const props = defineProps<{
    entry: UrlInfo,
}>();


function removeTag(event: MouseEvent) {
    const tagElem = event.target as HTMLDivElement;
    const tag = tagElem.dataset.tag;
    if (!tag) {
        return;
    }
    props.entry?.delTag(tag);
}

</script>

<template>
    <div class="tag-master" @click="removeTag">
        <div class="tag" v-for="tag of entry.tags" :data-tag="tag">{{tag}}</div>
    </div>
</template>

<style scoped>

</style>
