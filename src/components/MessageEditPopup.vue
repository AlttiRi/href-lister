<template>
  <Teleport to="body">
    <div class="message-edit-popup modal" v-if="popupEntry" @click="onCloseClick">
      <div class="popup-content">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{popupEntry.url}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseClick"></button>
          </div>
          <div class="modal-body">
            <textarea rows="5"
                      :value="popupEntry.comment || popupEntry.inputComment"
                      @input="onInput"
                      ref="textareaElem"
                      @keydown="onEnterKeyDown"
            ></textarea>
          </div>
<!--          <div class="modal-footer">-->
<!--            <button type="button" class="btn btn-secondary">Close</button>-->
<!--            <button type="button" class="btn btn-primary">Save changes</button>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {popupEntry} from "./core";


function onCloseClick(event: MouseEvent) {
  if (event.currentTarget === event.target) {
    popupEntry.value = null;
  }
}

function onEnterKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    popupEntry.value = null;
  }
}

const textareaElem: Ref<HTMLInputElement | null> = ref(null);
const focusTextarea = () => {
    textareaElem.value?.focus();
};
onMounted(focusTextarea);

function onInput(event: InputEvent) {
  const newValue = (event.currentTarget as HTMLInputElement).value;
  void popupEntry.value?.setComment(newValue);
}

</script>

<style scoped>
.message-edit-popup {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /*backdrop-filter: blur(1px);*/
  background-color: rgba(255, 255, 255, 0.5);
  /*pointer-events: none;*/
}
.popup-content {
  /*pointer-events: auto;*/
  min-width: 420px;
  max-width: min(520px, 80%);
}
.modal-content {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

textarea {
  width: 100%;
  height: 100%;
  resize: none;
}
textarea:focus {
  outline: none;
}

.modal-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
