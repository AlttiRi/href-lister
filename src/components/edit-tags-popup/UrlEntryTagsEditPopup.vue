<template>
  <Teleport to="body">
    <div
      class="modal tags-edit-popup"
      v-if="tagsPopupEntry"
      @pointerdown="closePopup"
      data-component="URLsInfoLine"
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
              <div class="tag-master">
                <SuggestedTag :tag-wrap="tagWrap" v-for="tagWrap of tagWrapsFiltered"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import SelectedTags  from "./SelectedTags.vue";
import SuggestedTag  from "./SuggestedTag.vue";
import {computed, ComputedRef, Ref, ref} from "vue";
import {UrlEntry} from "../../core/url-entry";
import {tagsPopupEntry} from "../../core/core";
import {allTags, TagWrap} from "../../core/tags";


const inputTagText = ref("");


const entry: Ref<UrlEntry> = tagsPopupEntry as Ref<UrlEntry>;
const tagWraps: ComputedRef<TagWrap[]> = computed(() => {
  return allTags.value.map(tag => ({
    tag,
    entry: entry.value,
  }));
});
const tagWrapsFiltered: ComputedRef<TagWrap[]> = computed(() => {
  const starts:   TagWrap[] = [];
  const contains: TagWrap[] = [];
  for (const tagProp of tagWraps.value) {
    const index = tagProp.tag.indexOf(inputTagText.value);
    if (index === -1) {
      continue;
    }
    if (index === 0) {
      starts.push(tagProp);
    } else {
      contains.push(tagProp);
    }
  }
  return [starts, contains].flat();
});


function selectTag() { // @tabPressed
  // todo ...
  inputTagText.value = "";
}

function closePopup(event: MouseEvent) {
  if (event.currentTarget === event.target) {
    tagsPopupEntry.value = null;
  }
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
