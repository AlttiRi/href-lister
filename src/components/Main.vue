<template>
  <div data-comp="Main">
    <hr>
    <Filters/>
    <hr>
    <InputControls/>
    <hr>
    <URLsInfoLine/>
    <hr>
    <UrlList/>
    <UrlListItemTagsEditPopup v-if="tagsPopupEntry"/>
    <PopupWrapper v-if="messagePopupEntry">
      <MessageEditPopup/>
    </PopupWrapper>
    <PopupWrapper v-if="showAutoClickPopup">
      <AutoClickPopup/>
    </PopupWrapper>
  </div>
</template>

<script setup lang="ts">
import Filters from "./Filters.vue";
import PopupWrapper from "./PopupWrapper.vue";
import InputControls from "./InputControls.vue";
import URLsInfoLine from "./URLsInfoLine.vue";
import AutoClickPopup from "./AutoClickPopup.vue";
import UrlList from "./UrlList.vue";
import MessageEditPopup from "./MessageEditPopup.vue";
import UrlListItemTagsEditPopup from "./edit-tags-popup/UrlListItemTagsEditPopup.vue";
import {messagePopupEntry, showAutoClickPopup, tagsPopupEntry} from "../core/core";
import "../style/tag.scss";
import "../style/popup-auto-click.scss";
</script>

<style scoped>

</style>
