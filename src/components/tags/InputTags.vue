<script setup lang="ts">
import {UrlInfo} from "../../core/url-info-entry";

const props = defineProps<{
    entry: UrlInfo,
    tags: string[],
}>();

function toggleTag(event: MouseEvent) {
    const tagElem = event.target as HTMLDivElement;
    const tag = tagElem.dataset.tag;
    if (!tag) {
        return;
    }
    if (isSelected(tag))  {
        props.entry.delTag(tag);
    } else {
        props.entry.addTag(tag);
    }
}

function isSelected(tag: string) {
    return props.entry.tags?.includes(tag);
}

</script>

<template>
    <div class="tag-master" @click="toggleTag">
        <div class="tag" :class="{selected: isSelected(tag)}" v-for="tag of tags" :data-tag="tag">{{tag}}</div>
    </div>
</template>

<style scoped>
.selected {
    opacity: 0.6;
}
</style>
