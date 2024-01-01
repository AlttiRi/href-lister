<script setup lang="ts">
import InputTagsItem from "./InputTagsItem.vue";
import {TagPropsHelper} from "../../core/tags";

const props = defineProps<{
    tagPropsHelper: TagPropsHelper,
}>();

function toggleTag(event: MouseEvent) {
    const tagElem = event.target as HTMLDivElement;
    const tag = tagElem.dataset.tag;
    if (!tag) {
        return;
    }
    void props.tagPropsHelper.toggleTag(tag);
}


</script>

<template>
    <div class="tag-master InputTags--comp" @click="toggleTag">
        <InputTagsItem
            v-for="tagProp of tagPropsHelper.tags.value"
            :tag="tagProp.tag"
            :selected="tagPropsHelper.isSelected(tagProp)"
        />
    </div>
</template>

<style scoped>

</style>
