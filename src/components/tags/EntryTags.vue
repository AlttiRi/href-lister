<script setup lang="ts">
import {UrlInfo} from "../../core/url-info-entry";

defineProps<{
    entry: UrlInfo,
}>();

</script>

<template>
    <div class="tag-master">
        <div class="tag" v-for="tag of entry.tags" :data-tag="tag">{{tag}}</div>
    </div>
</template>

<style scoped>

</style>
