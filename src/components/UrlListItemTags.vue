<template>
  <div
    class="tags-wrapper"
    @click="toggleTagsEditPopup"
    data-comp="UrlListItemTags"
  >
    <div class="tags">
      <div class="tag-master" data-comp="EntryTags">
        <div class="tag" v-for="tag of ue.tags" :data-tag="tag">{{tag}}</div>
      </div>
    </div>
    <div v-if="!ue.tags?.length" class="tag add-tag"><span class="plus">+</span></div>
  </div>
</template>

<script setup lang="ts">
import {toRaw} from "vue";
import {UrlEntry} from "../core/url-entry";
import {tagsPopupEntry} from "../core/core";


const props = defineProps<{ue: UrlEntry}>();

function toggleTagsEditPopup() { // <.tags-wrapper> @click
    if (toRaw(tagsPopupEntry.value) === toRaw(props.ue)) {
        tagsPopupEntry.value = null;
    } else {
        tagsPopupEntry.value = props.ue;
    }
    console.log(tagsPopupEntry.value);
}
</script>

<style scoped lang="scss">
.tags-wrapper {
  position: absolute;
  right: 0;
  display: flex;
  .plus {
    display: inline-flex;
    justify-content: center;
  }
}
</style>
