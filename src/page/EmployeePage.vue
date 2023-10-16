<script setup lang="ts">
import { ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';

var mode = ref(0);
</script>


<template>
  <div class="page-wrapper">
    <div class="mode-tab-wrapper">
      <DoubleBkButton :is_active="mode == 1" @clicked="mode = 1">功能1</DoubleBkButton>
      <DoubleBkButton :is_active="mode == 2" @clicked="mode = 2">功能2</DoubleBkButton>
      <DoubleBkButton :is_active="mode == 3" @clicked="mode = 3">功能3</DoubleBkButton>
    </div>
  </div>
</template>


<style scoped lang="scss">
.page-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  .mode-tab-wrapper {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // gap: 50px;

    .dbb-wrapper {
      height: 100px;
      margin: 0;

      &:hover {
        height: 110px;
      }
    }
  }
}
</style>