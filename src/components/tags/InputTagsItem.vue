<script setup lang="ts">

/*const props = */defineProps<{
    selected: boolean,
    tag: string
}>();

</script>

<template>
    <div class="tag" :class="{selected}" :data-tag="tag">{{tag}}</div>
</template>

<style scoped>
.selected {
    opacity: 0.6;
}

</style>
