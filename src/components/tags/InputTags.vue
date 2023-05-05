<script setup lang="ts">
import {UrlInfo} from "../../core/url-info-entry";
import InputTagsItem from "./InputTagsItem.vue";
import {TagProp} from "../../core/tags";

const props = defineProps<{
    entry: UrlInfo,
    tagProps: TagProp[],
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
        <InputTagsItem v-for="tagProp of tagProps" :tag="tagProp.tag" :selected="isSelected(tagProp.tag)"/>
    </div>
</template>

<style scoped>

</style>
