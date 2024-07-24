<script setup lang="ts">
import Filters          from "./Filters.vue";
import PopupWrapper     from "./PopupWrapper.vue";
import InputControls    from "./InputControls.vue";
import URLsInfoLine     from "./URLsInfoLine.vue";
import UrlList          from "./UrlList.vue";
import MessageEditPopup from "./MessageEditPopup.vue";
import PopupUrlCleaner  from "./popup/PopupUrlCleaner.vue";
import PopupAutoClicker from "./popup/PopupAutoClicker.vue";
import UrlEntryTagsEditPopup from "./edit-tags-popup/UrlEntryTagsEditPopup.vue";
import {messagePopupEntry, showPopupAutoClicker, showPopupUrlCleaner, tagsPopupEntry} from "@/core/core";
import "../style/main.scss";
import "../style/tag.scss";
import "@alttiri/popup-enhance/css/popup.css";
</script>

<template>
  <div data-component="Main">
    <hr>
    <Filters/>
    <hr>
    <InputControls/>
    <hr>
    <URLsInfoLine/>
    <hr>
    <UrlList/>
    <UrlEntryTagsEditPopup v-if="tagsPopupEntry"/>
    <PopupWrapper v-if="messagePopupEntry">
      <MessageEditPopup/>
    </PopupWrapper>
    <PopupWrapper v-if="showPopupAutoClicker">
      <PopupAutoClicker/>
    </PopupWrapper>
    <PopupWrapper v-if="showPopupUrlCleaner">
      <PopupUrlCleaner/>
    </PopupWrapper>
  </div>
</template>

<style scoped>

</style>
