<template>
  <div>
    <table class="table table-borderless">
      <tbody>
        <UrlListItem v-for="ue in urlEntryList" :key="ue.url" :ue="ue"/>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {urlEntryList} from "./core";
import UrlListItem from "./UrlListItem.vue";
</script>

<style scoped>

</style>
