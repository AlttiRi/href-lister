<template>
    <Teleport to="body">
        <div class="modal tags-edit-popup" v-if="tagsPopupEntry" @pointerdown="closePopup">
            <div class="popup-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{tagsPopupEntry.url}}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="selected-tags tags">
                            <Tag class="tag" v-for="tag of tagsPopupEntry.tags" :tag="tag"/>
                        </div>
                        <div class="all-tags tags">
                            <Tag class="tag" v-for="tag of allTags" :tag="tag"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import {tagsPopupEntry} from "../core/core";
import {allTags} from "../core/tags";
import Tag from "./Tag.vue";


function closePopup(event: MouseEvent) {
    if (event.currentTarget === event.target) {
        tagsPopupEntry.value = null;
    }
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
</style>
