<template>
<div class="tags-wrapper" @click="toggleTagsEditPopup">
    <div class="tags">
        <EntryTags :entry="ue"/>
    </div>
    <div v-if="!ue.tags?.length" class="tag add-tag"><span class="plus">+</span></div>
</div>
</template>

<script setup lang="ts">
import {toRaw} from "vue";
import {UrlInfo} from "../core/url-info-entry";
import {tagsPopupEntry} from "../core/core";
import EntryTags from "./tags/EntryTags.vue";


const props = defineProps<{ue: UrlInfo}>();

function toggleTagsEditPopup() { // <.tags-wrapper> @click
    if (toRaw(tagsPopupEntry.value) === toRaw(props.ue)) {
        tagsPopupEntry.value = null;
    } else {
        tagsPopupEntry.value = props.ue;
    }
    console.log(tagsPopupEntry.value);
}
</script>

<style scoped lang="scss">
.tags-wrapper {
  position: absolute;
  right: 0;
  display: flex;
  .plus {
    display: inline-flex;
    justify-content: center;
  }
}
</style>
