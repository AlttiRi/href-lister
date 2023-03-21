<template>
  <Teleport to="body">
    <div class="message-edit-popup modal" v-if="popupEntry">
      <div class="popup-content">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{popupEntry.url}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="onCloseClick"></button>
          </div>
          <div class="modal-body">
            <textarea rows="5"
                      :value="popupEntry.commentFromStore || popupEntry.comment"
                      @input="onInput"
                      ref="textareaElem"
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
import {popupEntry} from "./core";
import {saveComment} from "./state-store";
import {onMounted, onUpdated, Ref, ref} from "vue";


function onCloseClick() {
  popupEntry.value = null;
}

const textareaElem: Ref<HTMLInputElement | null> = ref(null);
const focusTextarea = () => textareaElem.value?.focus();
onMounted(focusTextarea);
onUpdated(focusTextarea);

function onInput(event: InputEvent) {
  if (!popupEntry.value) {
    return;
  }
  const newValue = (event.currentTarget as HTMLInputElement).value;
  popupEntry.value.commentFromStore = newValue;
  // console.log(popupEntry.value.comment);
  // console.log(popupEntry.value.commentFromStore);
  saveComment(popupEntry.value.url, newValue);
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
  pointer-events: none;
}
.popup-content {
  pointer-events: auto;
  min-width: 420px;
  max-width: min(520px, 80%);
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
