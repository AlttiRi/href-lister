<script setup lang="ts">
import {ref} from "vue";
import FancyPopup from "./popup/FancyPopup.vue";
import UrlCleanerConfig from "./UrlCleanerConfig.vue";

const headerElem = ref<HTMLElement | null>(null);
</script>

<template>
  <FancyPopup data-slot-component="UrlCleanerPopup"
              id="url-cleaner" :header="headerElem"
  >
    <div class="popup-header p-1" ref="headerElem">Url Cleaner</div>
    <div class="popup-content">
      <UrlCleanerConfig/>
    </div>
  </FancyPopup>
</template>

<style scoped>

</style>
