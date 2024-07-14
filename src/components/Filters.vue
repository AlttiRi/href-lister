<script setup lang="ts">
import {input_only, input_ignore} from "../core/filters";
</script>

<template>
  <div class="row row-cols-lg-3 g-3 align-items-center" data-component="Filters">
    <div class="col-12">
      <label>
        <span class="input-group">
          <span class="input-group-text">Only</span>
          <input type="text" class="form-control" v-model="input_only">
        </span>
      </label>
    </div>
    <div class="col-12">
      <label>
        <span class="input-group">
          <span class="input-group-text">Ignore</span>
          <input type="text" class="form-control" v-model="input_ignore">
        </span>
      </label>
    </div>
  </div>
</template>

<style scoped>
label {
    display: contents;
}
</style>
