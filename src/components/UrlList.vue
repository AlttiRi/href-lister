<template>
  <div>
    <table class="table table-borderless">
      <tbody>
        <UrlListItem v-for="ue in urlEntryListFiltered" :key="ue.url" :ue="ue"/>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import UrlListItem from "./UrlListItem.vue";
import {urlEntryListFiltered} from "./core";
</script>

<style scoped>

</style>
