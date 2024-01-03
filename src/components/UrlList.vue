<template>
  <div data-comp="UrlList">
    <table class="table table-borderless">
      <tbody>
        <UrlListItem v-for="(ue, index) in urlEntryListFiltered" :ue="ue" :index="index"/>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import UrlListItem from "./UrlListItem.vue";
import {urlEntryListFiltered} from "../core/core";
</script>

<style scoped>

</style>
