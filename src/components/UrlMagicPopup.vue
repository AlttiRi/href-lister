<script setup lang="ts">
import {ref, watchEffect} from "vue";
import FancyPopup from "./popup/FancyPopup.vue";
import UrlCleanerConfig from "./UrlCleanerConfig.vue";
import {commonSettings, urlCleanerSettings, urlOriginSettings} from "../core/core";

const headerElem = ref<HTMLElement | null>(null);

const activeTab = ref<"cleaner" | "originer">("cleaner");
const btnInsertPlace = ref<HTMLElement | null>(null);

const ready = ref(false);
watchEffect(() => {
  if (btnInsertPlace.value) {
    ready.value = true;
  }
});

const {useCleaner, useOriginer} = commonSettings;
function toggle(property: "useCleaner" | "useOriginer") {
  commonSettings[property].value = !commonSettings[property].value;
}
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
                  :class="{
                    'active': activeTab === 'cleaner',
                    'turned-off': !useCleaner,
                  }"
                  @click="activeTab = 'cleaner'"
                  @contextmenu.prevent="() => toggle('useCleaner')"
          >Url Cleaner</button>
          <button title="Rule String Array based config"
                  class="btn btn-outline-primary"
                  :class="{
                    'active': activeTab === 'originer',
                    'turned-off': !useOriginer,
                  }"
                  @click="activeTab = 'originer'"
                  @contextmenu.prevent="() => toggle('useOriginer')"
          >Url Origin</button>
        </span>
        <span style="margin-left: auto;" class="btn-insert-place"
              ref="btnInsertPlace"
        >
          <!-- teleport place -->
        </span>
      </div>
      <div v-if="ready" class="ready-required">
        <div v-if="activeTab === 'cleaner'">
          <UrlCleanerConfig :ucSettings="urlCleanerSettings" :btnInsertPlace/>
        </div>
        <div v-else>
          <UrlCleanerConfig :ucSettings="urlOriginSettings" :btnInsertPlace/>
        </div>
      </div>
    </div>
  </FancyPopup>
</template>

<style scoped>
.flex {
  display: flex;
}
.turned-off {
  text-decoration: line-through;
}
</style>
