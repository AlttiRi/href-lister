<script setup lang="ts">
import {ref} from "vue";
import FancyPopup from "@/components/popup/FancyPopup.vue";
import {exportUrlEntryStore, importUrlEntryStore} from "@/core/url-entry";
import {downloadBlob} from "@/core/util";
import {entriesToLineJsonParts, getListHostname, hashUrls} from "@/components/popup/export-util";

const headerElem = ref<HTMLElement | null>(null);

async function exportStoreIDB(): Promise<void> {
  const entries = await exportUrlEntryStore();
  console.log(entries);
  const urls = entries.map(([k, _v]) => k);
  const hexes = hashUrls(urls);
  // let hostname = getListHostname(urls);
  // if (hostname) {
  //   hostname = hostname + "_";
  // }
  const jsonParts = entriesToLineJsonParts(entries);
  downloadBlob(new Blob(jsonParts), `href-lister-idb_(${entries.length}-${hexes}).json`);
}

const importInputElem = ref<HTMLInputElement | null>(null);  // todo: useTemplateRef
async function onImportInputChange(): Promise<void> {
  if (!importInputElem.value?.files) {
    return;
  }
  const file = importInputElem.value.files[0];
  console.log(file);
  const json = JSON.parse(await file.text());
  console.log(json);
  const result = await importUrlEntryStore(json);
  console.log(result);
}

</script>

<template>
  <FancyPopup data-slot-component="PopupSettings"
              id="settings" :header="headerElem"
  >
    <div class="popup-header p-1" ref="headerElem">Settings</div>
    <div class="popup-content">
      <span class="row">
        <span class="line m-1">
          <span class="btn-group">
            <span class="input-group-text me-1 text-center">Store Export</span>
          </span>
          <span class="btn-group">
            <button
                class="btn btn-outline-primary"
                title="Export IndexedDB data"
                @click="exportStoreIDB"
            >Export IDB</button>
            <button
                class="btn btn-outline-primary"
                title="Export IndexedDB data"
                @click="importInputElem && importInputElem.click()"
            >Import IDB</button>
          </span>
        </span>
      </span>
      <input type="file" accept=".json" id="importIdb" hidden
             ref="importInputElem"
             @change="onImportInputChange"
      />
    </div>
  </FancyPopup>
</template>

<style scoped>

</style>