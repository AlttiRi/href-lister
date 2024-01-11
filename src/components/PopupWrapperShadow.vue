<script setup lang="ts">
import {onBeforeUnmount, ref, watchEffect} from "vue";

const shadowWrapperElem   = ref<HTMLDivElement>();
const shadowContainerElem = ref<HTMLElement>();
watchEffect(() => {
  const shadowWrapper = shadowWrapperElem.value;
  if (!shadowWrapper) {
    return;
  }
  shadowWrapper.attachShadow({mode: "open"});
  if (!shadowWrapper.shadowRoot) {
    console.error("`shadowRoot` is missed");
    return;
  }
  shadowWrapper.shadowRoot.innerHTML = `<main class="inner-shadow-wrapper"></main>`;
  const shadowInnerContainer = shadowWrapper.shadowRoot.querySelector("main.inner-shadow-wrapper");
  if (!shadowInnerContainer) {
    console.error("`shadowInnerContainer` is missed");
    return;
  }
  shadowContainerElem.value = shadowInnerContainer as HTMLElement;

  const styleLinks: Element[] = Array.from(document.querySelectorAll("head > link"));
  for (const style of styleLinks) {
    shadowInnerContainer.append(style.cloneNode());
  }
});


const styleFileName = "popup-auto-click.scss";
let observer: MutationObserver;
const stopWE = watchEffect(function shadowDomStyleProvider(){
  if (!shadowWrapperElem.value) {
    return;
  }
  const styleElem = document.querySelector(`head > style[data-vite-dev-id$="${styleFileName}"]`);
  if (!styleElem) {
    console.error(`style[data-vite-dev-id$="${styleFileName}"] is missed`);
    return;
  }
  const shadowMainElem = shadowWrapperElem.value.shadowRoot!.querySelector("main");
  const styleElemClone = styleElem.cloneNode(true);
  shadowMainElem!.append(styleElemClone);
  observer = new MutationObserver((mutationList: MutationRecord[], _observer: MutationObserver) => {
    styleElemClone.textContent = mutationList[0].addedNodes[0].textContent;
  });
  observer.observe(styleElem, {childList: true});
  stopWE();
});

onBeforeUnmount(() => {
  observer.disconnect();
});


</script>

<template>
  <Teleport to="body">
    <div class="outer-shadow-wrapper" ref="shadowWrapperElem"></div>
  </Teleport>
  <Teleport :to="shadowContainerElem" v-if="shadowWrapperElem">
    <slot></slot>
  </Teleport>
</template>
