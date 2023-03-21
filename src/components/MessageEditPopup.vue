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
                      v-model="popupEntry.comment"
            ></textarea>
          </div>
<!--          <div class="modal-footer"></div>-->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {popupEntry, urlEntryList} from "./core";


function onCloseClick() {
  popupEntry.value = null;
}

function onChange(event: InputEvent) {
  console.log(event);
  console.log(urlEntryList.value);
  const x = urlEntryList.value.find(e => e.url === popupEntry.value?.url);
  console.log(x);
  if (popupEntry.value) {
    popupEntry.value.comment += "!";
  }
}

// if (popupEntry.value?.comment) {
//   popupEntry.value.comment = "xxxx"
// }

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
