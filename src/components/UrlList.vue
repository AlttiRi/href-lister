<script setup lang="ts">
import UrlListItem from "./UrlListItem.vue";
import {urlEntryListFiltered} from "../core/core";
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
