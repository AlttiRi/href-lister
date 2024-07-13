<template>
  <Main/>
  <a class="readme" title="Open Readme" href="https://github.com/AlttiRi/href-lister" target="_blank"><i>i</i></a>
</template>

<script setup lang="ts">
import Main from "./components/Main.vue";
</script>

<style scoped>
.readme {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2px 8px;
  margin: 1px;
  color: darkgray;
  text-decoration: none;
}
</style>
