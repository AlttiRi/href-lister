<template>
  <div>
    <table class="table table-borderless">
      <tbody>
      <tr v-for="url in urls">
        <td>
          <span class="info-dot" @contextmenu="onInfoDotContextMenu"></span>
          <a class="url link-primary" :href="url" target="_blank" rel="noreferrer noopener"
             @click="onClick"
          >{{url}}</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {urls} from "./core";

function onClick(event: MouseEvent) {
  const linkEl = event.currentTarget as HTMLAnchorElement;
  linkEl.parentElement?.classList.add("clicked");
}

function onInfoDotContextMenu(event: MouseEvent) {
  event.preventDefault();
  const spanEl = event.currentTarget as HTMLElement;
  spanEl.parentElement?.classList.toggle("clicked");
}

</script>

<style scoped>
a {
  margin-left: 4px;
  text-decoration: none;
  vertical-align: middle;
}
a:visited {
  color: #6f42c1 !important;
}
.clicked {
  background-color: #0000000f;
}
.info-dot {
  height: 16px;
  width: 16px;
  background-color: #0000000f;
  vertical-align: middle;
  display: inline-block;
  border-radius: 8px;
}
</style>
