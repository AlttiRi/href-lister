<script setup lang="ts">
import {urlEntryListFiltered} from "@/core/core";
import UrlListItem from "./UrlListItem.vue";
</script>

<template>
  <div data-component="UrlList">
    <table class="table table-borderless">
      <tbody>
        <UrlListItem v-for="(ue, index) in urlEntryListFiltered" :ue="ue" :index="index" :key="index + ue.url"/>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
