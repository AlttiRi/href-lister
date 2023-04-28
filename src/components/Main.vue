<template>
  <hr>
  <Filters/>
  <hr>
  <InputControls/>
  <hr>
  <UrlList/>
  <MessageEditPopup v-if="messagePopupEntry"/>
  <UrlListItemTagsEditPopup v-if="tagsPopupEntry"/>
</template>

<script setup lang="ts">
import Filters from "./Filters.vue";
import InputControls from "./InputControls.vue";
import UrlList from "./UrlList.vue";
import MessageEditPopup from "./MessageEditPopup.vue";
import UrlListItemTagsEditPopup from "./UrlListItemTagsEditPopup.vue";
import {messagePopupEntry, tagsPopupEntry} from "../core/core";
import "../style/tag.scss";
</script>

<style scoped>

</style>
