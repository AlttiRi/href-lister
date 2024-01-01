<template>
  <Teleport to="body">
    <div
      class="modal tags-edit-popup"
      v-if="tagsPopupEntry"
      @pointerdown="closePopup"
      data-comp="URLsInfoLine"
    >
      <div class="popup-content">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{tagsPopupEntry.url}}</h5>
          </div>
          <div class="modal-body">
            <div class="tags selected-tags-group">
              <SelectedTags :entry="tagsPopupEntry" v-model="inputTagText" @tabPressed="selectTag"/>
            </div>
            <div class="tags all-tags-group">
              <InputTags :tagPropsHelper="tagPropsHelper"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import InputTags from "./tags/InputTags.vue";
import SelectedTags from "./tags/SelectedTags.vue";
import {Ref, ref} from "vue";
import {UrlInfo} from "../core/url-info-entry";
import {TagPropsHelper} from "../core/tags";
import {tagsPopupEntry} from "../core/core";

const inputTagText = ref("");
function closePopup(event: MouseEvent) {
    if (event.currentTarget === event.target) {
        tagsPopupEntry.value = null;
    }
}

const tagPropsHelper = new TagPropsHelper(tagsPopupEntry as Ref<UrlInfo>, inputTagText);

function selectTag() { // @tabPressed
    // todo ...
    inputTagText.value = "";
}

</script>

<style scoped lang="scss">
.modal {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}
.popup-content {
  min-width: 420px;
  max-width: min(520px, 80%);
}
.modal-content {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.selected-tags-group {
  min-height: 33px;
  margin-bottom: 2px;
}
</style>
