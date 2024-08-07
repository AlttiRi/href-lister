<script setup lang="ts">
import {ref, Ref, watch} from "vue";
import {debounce, sleep, isString} from "@alttiri/util-js";
import {isUCRuleStringArray, UCRuleString, UrlCleaner} from "@alttiri/string-magic";
import {UCSettings} from "@/core/core";


const props = defineProps<{
  ucSettings: UCSettings,
  btnInsertPlace: HTMLElement | null,
}>();
const {ucRuleStrings, ucCompiledRules} = props.ucSettings;


const saveBtn: Ref<HTMLButtonElement | null> = ref(null);
const saved: Ref<boolean> = ref(true);
const valid: Ref<boolean> = ref(true);

const warnText: Ref<string> = ref("");
const editorValue: Ref<string> = ref("");
let lastSavedEditorValue = "";

const handleInputDebounced = debounce(handleInput, 220);
watch(ucRuleStrings, () => {
  editorValue.value = formatRuleStringArray(ucRuleStrings.value);
  lastSavedEditorValue = editorValue.value;
  watch(editorValue, handleInputDebounced);
}, {immediate: true});


async function save() {
  const btn = saveBtn.value!;
  btn.blur();
  ucRuleStrings.value = JSON.parse(editorValue.value) as UCRuleString[];
  ucCompiledRules.value = UrlCleaner.compileRuleStrings(ucRuleStrings.value);
  lastSavedEditorValue = editorValue.value;
  btn.classList.add("btn-outline-success");

  await sleep(800);
  saved.value = true;
  btn.classList.remove("btn-outline-success");
}


function handleInput() {
  const btn = saveBtn.value;
  if (!btn) {
    return;
  }
  if (editorValue.value === lastSavedEditorValue) {
    saved.value = true;
    valid.value = true;
    warnText.value = "";
    return;
  }
  valid.value = false;
  saved.value = false;

  // if (!editorValue.value) {
  //   editorValue.value = formatRuleStringArray(tcRuleStrings.defaultValue);
  //   // todo add restore btn
  // }

  try {
    const array: any = JSON.parse(editorValue.value);
    if (!Array.isArray(array)) {
      warnText.value = "Not an array";
      return;
    }
    if (array.length !== array.flat().length) {
      warnText.value = "Array is not flat";
      return;
    }
    if (!array.every(isString)) {
      warnText.value = "Array is not string one";
      return;
    }
    if (!isUCRuleStringArray(array)) {
      warnText.value = "Wrong data in the rule string array";
      return;
    }
    valid.value = true;
    warnText.value = "";
  } catch (e) {
    warnText.value = "Incorrect JSON";
  }
}

function formatRuleStringArray(array: UCRuleString[]): string {
  let str = JSON.stringify(array, null, 4);
  str = str.replaceAll(`    "site`, `"site`);
  return str;
}


</script>

<template>
  <div data-component="UrlCleanerConfig" class="url-cleaner">
    <textarea spellcheck="false" id="editor" class="form-control"
              v-model="editorValue"
    ></textarea>

    <teleport :to="btnInsertPlace">
      <button ref="saveBtn" id="save" class="btn btn-outline-primary"
              @click="save"
              :class="{
              disabled: saved || !valid,
            }"
      >Save</button>
    </teleport>
    <span class="warning">{{warnText}}</span>
  </div>
</template>

<style scoped>
.url-cleaner {
  padding: 2px;
}
#editor {
  width: 540px;
  min-height: 400px;
}
.warning {
  margin: 0 10px;
  color: grey;
}
.form-control:focus {
  box-shadow: none;
}
</style>
