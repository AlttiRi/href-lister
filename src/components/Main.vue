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
    <PopupWrapper v-if="showAutoClickPopup">
      <FancyPopup id="auto-clicker" v-slot="{fancyPopupSlotProps}">
        <AutoClickPopup :fancyPopupSlotProps/>
      </FancyPopup>
    </PopupWrapper>
    <PopupWrapper v-if="showUrlCleanerPopup">
      <UrlCleanerPopup/>
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
import FancyPopup from "./popup/FancyPopup.vue";
import UrlCleanerPopup from "./UrlMagicPopup.vue";
import UrlEntryTagsEditPopup from "./edit-tags-popup/UrlEntryTagsEditPopup.vue";
import {messagePopupEntry, showAutoClickPopup, showUrlCleanerPopup, tagsPopupEntry} from "../core/core";
import "../style/tag.scss";
import "../style/popup-auto-click.scss";
</script>

<style scoped>

</style>
