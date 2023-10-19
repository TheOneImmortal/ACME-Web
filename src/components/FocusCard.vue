<script setup lang="ts">
import { Ref, inject } from 'vue';


const main_color = inject<Ref<string>>('main_color');
const bk_color = inject<Ref<string>>('bk_color');
</script>


<template>
  <div class="fc-wrapper">
    <slot></slot>
  </div>
</template>


<style scoped lang="scss">
.fc-wrapper {
  padding: 100px 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: v-bind(bk_color);
  border: 1px solid transparent;
  box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 32px;
  transition: all 0.3s $ease-better;

  &:hover {
    box-shadow: 0px 10px 16px 6px rgba(0, 0, 0, 0.2);
  }

  &:has(:focus) {
    border: 1px solid v-bind(main_color);
  }
}
</style>