<script setup lang="ts">
import { Ref, inject, ref } from 'vue'


const props = defineProps<{
  is_active: boolean
}>()

const emits = defineEmits<{
  clicked: []
}>()


const text_color = inject<Ref<string>>('text_color')
const main_color = inject<Ref<string>>('main_color')
const auxiliary_color = inject<Ref<string>>('auxiliary_color')
const bk_color = inject<Ref<string>>('bk_color')


function clicked() {
  emits('clicked')
}
</script>


<template>
  <div :class="{ 'dbb-wrapper': true, 'active': is_active }" @click="clicked">
    <div class="bk2" />
    <div class="bk" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>


<style scoped lang="scss">
.dbb-wrapper {
  min-width: 10px;
  min-height: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  //border: 0;
  //outline: none;
  background-color: v-bind(bk_color);
  box-shadow: 0px 0px 2px v-bind(main_color + 'aa');
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);

  .bk {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: v-bind(main_color);
    transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    transition-delay: 0s;
    left: 0;
  }

  .bk2 {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: v-bind(auxiliary_color);
    transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
    left: 0;
  }

  .content {
    color: v-bind(main_color);
    position: relative;
    transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  &:hover,
  &.active {

    .bk {
      transition-delay: 0.15s;
    }

    .bk,
    .bk2 {
      width: 100%;
    }

    .content {
      color: v-bind(text_color);
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 6px v-bind(main_color + 'ff');
  }

  &.active {
    box-shadow: 0px 0px 12px v-bind(main_color + 'ff');
  }
}
</style>