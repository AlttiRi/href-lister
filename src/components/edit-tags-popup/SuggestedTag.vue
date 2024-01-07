<script setup lang="ts">
import {computed} from "vue";
import {TagWrap} from "../../core/tags";

const props = defineProps<{
    tagWrap: TagWrap,
}>();
const {entry, tag} = props.tagWrap;

const selected = computed<boolean>(() => {
  return Boolean(entry.tags?.includes(tag));
});

function toggleTag() {
  if (selected.value)  {
    void entry.delTag(tag);
  } else {
    void entry.addTag(tag);
  }
}
</script>

<template>
  <div
    class="tag"
    @click="toggleTag"
    :data-tag="tagWrap.tag"
    data-comp="SuggestedTag"
    :class="{
      selected
    }"
  >
    {{tagWrap.tag}}
  </div>
</template>

<style scoped>


.tag.selected {
  opacity: 0.6;
}
</style>
