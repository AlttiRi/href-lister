<template>
  <Teleport to="body">
    <div class="modal message-edit-popup" v-if="messagePopupEntry" @pointerdown="closePopup">
      <div class="popup-content">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{messagePopupEntry.url}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closePopup"></button>
          </div>
          <div class="modal-body">
            <textarea rows="5"
                      :value="comment"
                      @input="onInputSaveComment"
                      ref="textareaElem"
                      @keydown="closePopupOnEnter"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="removeComment">Reset</button>
<!--            <button type="button" class="btn btn-primary">Select</button>-->
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {computed, onMounted, Ref, ref} from "vue";
import {messagePopupEntry} from "../core/core";
import {UrlInfo} from "../core/url-info-entry";

const comment = computed(() => {
  const urlEntry = messagePopupEntry.value as UrlInfo;
  return urlEntry.comment === undefined ? urlEntry.inputComment : urlEntry.comment;
});

function closePopup(event: MouseEvent) {
  if (event.currentTarget === event.target) {
    messagePopupEntry.value = null;
  }
}

function closePopupOnEnter(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    messagePopupEntry.value = null;
  }
}

const textareaElem: Ref<HTMLInputElement | null> = ref(null);
const focusTextarea = () => {
  textareaElem.value?.focus();
};
onMounted(focusTextarea);

function onInputSaveComment(event: InputEvent) {
  const newValue = (event.currentTarget as HTMLInputElement).value;
  void messagePopupEntry.value?.setComment(newValue);
}

function removeComment() {
  messagePopupEntry.value?.delComment();
}

</script>

<style scoped lang="scss">
.modal {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}
.popup-content {
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
