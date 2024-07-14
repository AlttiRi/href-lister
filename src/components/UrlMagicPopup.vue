<script setup lang="ts">
import {defineAsyncComponent, ref} from "vue";
import FancyPopup from "./popup/FancyPopup.vue";
import {urlCleanerSettings, urlOriginSettings} from "../core/core";

const headerElem = ref<HTMLElement | null>(null);

const activeTab = ref<"cleaner" | "originer">("cleaner");
const btnInsertPlace = ref<HTMLElement | null>(null);

const ready = ref(false);
const UrlCleanerConfigAsync = defineAsyncComponent(() => {
  const component = import("./UrlCleanerConfig.vue");
  component.then(() => ready.value = true);
  return component;
});
</script>

<template>
  <FancyPopup data-slot-component="UrlCleanerPopup"
              id="url-cleaner" :header="headerElem"
             v-show="ready"
  >
    <div class="popup-header p-1" ref="headerElem">Url Magic Transforms</div>
    <div class="popup-content">
      <div class="p-1 flex">
        <span class="btn-group">
          <span class="input-group-text me-1 text-center">Configs</span>
        </span>
        <span class="btn-group">
          <button title="Rule String Array based config"
                  class="btn btn-outline-primary"
                  :class="{'active': activeTab === 'cleaner'}"
                  @click="activeTab = 'cleaner'">Url Cleaner</button>
          <button title="Rule String Array based config"
                  class="btn btn-outline-primary"
                  :class="{'active': activeTab === 'originer'}"
                  @click="activeTab = 'originer'">Url Origin</button>
        </span>
        <span style="margin-left: auto;" class="btn-insert-place"
              ref="btnInsertPlace"
        >
          <!-- teleport place -->
        </span>
      </div>
      <div v-if="activeTab === 'cleaner'">
        <UrlCleanerConfigAsync :ucSettings="urlCleanerSettings" :btnInsertPlace/>
      </div>
      <div v-else>
        <UrlCleanerConfigAsync :ucSettings="urlOriginSettings" :btnInsertPlace/>
      </div>
    </div>
  </FancyPopup>
</template>

<style scoped>
.flex {
  display: flex;
}
</style>
