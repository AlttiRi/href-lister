<template>
    <div class="tag" @click="addTag" @contextmenu.prevent="removeTag">{{tag}}</div>
</template>

<script setup lang="ts">
import {tagsPopupEntry} from "../core/core";

const props = defineProps<{tag: string}>();

function addTag() {
    tagsPopupEntry.value?.addTag(props.tag);
}

function removeTag() {
    tagsPopupEntry.value?.delTag(props.tag);
}


</script>

<style scoped>
</style>
