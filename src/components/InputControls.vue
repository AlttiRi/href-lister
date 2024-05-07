<template>
  <div class="row row-cols-lg-3 g-3 align-items-end" data-comp="InputControls">
    <div class="input col-12">
      <label for="urls-textarea" class="fuck-off-lighthouse"></label>
      <textarea
        id="urls-textarea" spellcheck="false"
        v-model="inputText"
        ref="textareaEl"
        :disabled="!editable"
      ></textarea>
    </div>
    <div class="input col-12">
      <span  class="row">
        <span class=".col m-1">
          <span class="btn-group">
            <span class="input-group-text me-2">Clipboard</span>
          </span>
          <button
            class="btn btn-outline-primary me-1"
            @click="onReplaceClipboardText"
            :disabled="!editable"
          >Replace</button>
          <button
            class="btn btn-outline-primary me-1"
            @click="onAppendClipboardText"
            :disabled="!(editable || appendable)"
          >Append</button>
        </span>
        <span class=".col m-1">
          <span class="btn-group">
            <span class="input-group-text me-2 text-center">Controls</span>
          </span>
          <button
            class="btn btn-outline-danger me-1"
            @click="onClearTextInput"
            :disabled="!editable"
          >Clear</button>
          <button
            class="btn btn-primary me-1" title="Copy URLs"
            @click="onCopyUrlsAsList"
            @contextmenu="onCopyUrlsAsColumn"
            @pointerdown="onCopyUrlsAsCodeArrays"
          >Copy</button>
          <button
            class="btn btn-outline-primary me-1"
            title="Toggle Auto Clicker Popup"
            @click="showAutoClickPopup = !showAutoClickPopup"
            @contextmenu.prevent="resetPopup"
          >Auto Clicker</button>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {sleep} from "@alttiri/util-js";
import {appendable, editable, inputText, resetPopup, showAutoClickPopup, urlsFiltered} from "../core/core";
import {getCodeArrays} from "../core/util";

const blinkButtonMap = new WeakMap();
async function blink(elem: HTMLElement) {
  elem.classList.add("btn-active");
  const sleep_time = sleep(150);
  blinkButtonMap.set(elem, sleep_time);
  await sleep_time;
  if (blinkButtonMap.get(elem) === sleep_time) {
    elem.classList.remove("btn-active");
  }
}


const textareaEl: Ref<HTMLTextAreaElement | null> = ref(null);

function onClearTextInput(event: MouseEvent) {
  inputText.value = "";
  textareaEl.value?.focus();
  void blink(event.currentTarget as HTMLElement);
}


function onCopyUrlsAsList(event: MouseEvent) {
  void navigator.clipboard.writeText(urlsFiltered.value.join(" "));
  void blink(event.currentTarget as HTMLElement);
}
function onCopyUrlsAsColumn(event: MouseEvent) {
  event.preventDefault();
  void navigator.clipboard.writeText(urlsFiltered.value.join("\n"));
  void blink(event.currentTarget as HTMLElement);
}
function onCopyUrlsAsCodeArrays(event: PointerEvent) {
  const MIDDLE_BUTTON = 1;
  if (event.button === MIDDLE_BUTTON) {
    event.preventDefault();
    void navigator.clipboard.writeText(getCodeArrays(urlsFiltered.value));
    void blink(event.currentTarget as HTMLElement);
  }
}

async function onAppendClipboardText(event: MouseEvent) {
  const {currentTarget} = event;
  const text = await navigator.clipboard.readText();
  console.log("[clipboard] readText:", text);
  if (inputText.value && !inputText.value.endsWith("\n")) {
    inputText.value += "\n";
  }
  inputText.value += text;
  void blink(currentTarget as HTMLElement);
}
async function onReplaceClipboardText(event: MouseEvent) {
  const {currentTarget} = event;
  const text = await navigator.clipboard.readText();
  console.log("[clipboard] readText:", text);
  inputText.value = text;
  void blink(currentTarget as HTMLElement);
}

</script>


<style scoped>
.btn-group > .input-group-text {
  width: 100px;
  justify-content: center;
}
.btn-active,
.btn-active:active {
  background-color: black;
  color: white;
}

textarea {
  width: 100%;
  height: 82px;
  resize: none;
}
textarea:focus {
  outline: none;
}

.fuck-off-lighthouse {
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 0;
  width: 0;
}
</style>
