<template>
  <div class="row row-cols-lg-3 g-3 align-items-end">
    <div class="input col-12">
      <textarea spellcheck="false" v-model="inputText" ref="textareaEl"></textarea>
    </div>
    <div class="input col-12">
      <span  class="row">
        <span class=".col m-1">
          <span class="btn-group">
            <span class="input-group-text me-2">Clipboard</span>
          </span>
          <button class="btn btn-outline-primary me-1"
                  @click="onReplaceClipboardText"
          >Replace</button>
          <button class="btn btn-outline-primary me-1"
                  @click="onAppendClipboardText"
          >Append</button>
        </span>
        <span class=".col m-1">
          <span class="btn-group">
            <span class="input-group-text me-2 text-center">Controls</span>
          </span>
          <button class="btn btn-outline-primary me-1"
                  @click="onClearTextInput"
          >Clear</button>
          <button class="btn btn-primary me-1" title="Copy URLs"
                  @click="onCopyUrlsAsList"
                  @contextmenu="onCopyUrlsAsColumn"
                  @pointerdown="onCopyUrlsAsCodeArrays"
          >Copy</button>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {sleep} from "@alttiri/util-js";
import {getCodeArrays, inputText, urls} from "./core";


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
  void navigator.clipboard.writeText(urls.value.join(" "));
  void blink(event.currentTarget as HTMLElement);
}
function onCopyUrlsAsColumn(event: MouseEvent) {
  event.preventDefault();
  void navigator.clipboard.writeText(urls.value.join("\n"));
  void blink(event.currentTarget as HTMLElement);
}
function onCopyUrlsAsCodeArrays(event: PointerEvent) {
  const MIDDLE_BUTTON = 1;
  if (event.button === MIDDLE_BUTTON) {
    event.preventDefault();
    void navigator.clipboard.writeText(getCodeArrays(urls.value));
    void blink(event.currentTarget as HTMLElement);
  }
}

async function onAppendClipboardText(event: MouseEvent) {
  const {currentTarget} = event;
  const text = await navigator.clipboard.readText();
  console.log("[clipboard] readText:", text);
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
</style>
