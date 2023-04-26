<template>
  <hr>
  <Filters/>
  <hr>
  <InputControls/>
  <hr>
  <UrlList/>
  <MessageEditPopup v-if="popupEntry"/>
</template>

<script setup lang="ts">
import Filters from "./Filters.vue";
import InputControls from "./InputControls.vue";
import UrlList from "./UrlList.vue";
import MessageEditPopup from "./MessageEditPopup.vue";
import {popupEntry} from "../core/core";
</script>

<style scoped>

</style>
