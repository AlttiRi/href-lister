<template>
  <div>
    <table class="table table-borderless">
      <tbody>
      <tr v-for="ue in urlEntryList" :key="ue.url">
        <UrlListItem :ue="ue"/>
      </tr>
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
