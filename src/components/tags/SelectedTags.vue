<script setup lang="ts">
import {UrlInfo} from "../../core/url-info-entry";
import {onMounted, Ref, ref} from "vue";

const props = defineProps<{
    entry: UrlInfo,
}>();


function removeTag(event: MouseEvent) {
    const tagElem = event.target as HTMLDivElement;
    const tag = tagElem.dataset.tag;
    if (!tag) {
        return;
    }
    props.entry?.delTag(tag);
}

const tagInput: Ref<HTMLInputElement | null> = ref(null);
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d")!;
onMounted(() => {
    if (tagInput.value) {
        context.font = window.getComputedStyle(tagInput.value).font;
    }
});
function resizeInput() {
    if (!tagInput.value) {
        return;
    }
    const textWidth = context.measureText(tagInput.value.value).width;
    tagInput.value.style.width = textWidth + 6 + "px";
}
function focusInput() {
    if (!tagInput.value) {
        return;
    }
    tagInput.value.selectionStart = tagInput.value.selectionEnd;
    tagInput.value.focus();
}
function selectInput() {
    tagInput.value?.select();
}


</script>

<template>
    <div class="selected-tags">
        <div class="tag-master" @click="removeTag">
            <div class="tag" v-for="tag of entry.tags" :data-tag="tag">{{tag}}</div>
        </div>
        <span
                class="label"
                @dblclick="selectInput"
                @click="focusInput"
        >
            <span class="input-wrapper">
                <input type="text"
                       ref="tagInput"
                       @input="resizeInput"
                >
            </span>
        </span>
    </div>
</template>

<style scoped>
.selected-tags {
    display: flex;
    flex-wrap: wrap;
}

input {
    border: none;
    outline: none;
    width: 16px;
    min-height: 31px;
    padding-bottom: 2px;
}
input:before {
    position: absolute;
    content: "+";
}
.input-wrapper {
    min-width: 38px;
    display: flex;
    justify-content: center;
}
.label {
    display: flex;
    width: auto;
    flex-grow: 2;
    margin-left: 3px;
    margin-bottom: 2px;

    border-image: linear-gradient(to right, transparent 0, #4b88b9 6px, transparent) 1;
    border-width: 1px;
    border-style: solid;
    border-top: 0;
    border-left: 0;
    border-right: 0;
}

</style>
