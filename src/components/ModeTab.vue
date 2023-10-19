<script setup lang="ts">
import { Ref, computed, inject, ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';


const props = defineProps<{
  modes: {
    mode: number; // 从1开始
    name: string;
  }[]
}>()

const emits = defineEmits<{
  mode_update: [number]
}>()


const main_color = inject<Ref<string>>('main_color');
const auxiliary_color = inject<Ref<string>>('auxiliary_color');
const bk_color = inject<Ref<string>>('bk_color');


const mode = ref(0);

const tab_width = computed(() => mode.value == 0 ? '400px' : '200px');
const tab_left_margin = computed(() => mode.value == 0 ? '100px' : '50px');
</script>


<template>
  <div class="mt-wrapper">
    <div class="mt-tabs">
      <DoubleBkButton v-for="item in modes" :key="item.mode" :is_active="mode == item.mode" @clicked="$emit('mode_update',
        mode = item.mode)" mode='switch'>
        {{ item.name }}</DoubleBkButton>
      <div class="bk" @click="$emit('mode_update', mode = 0)"></div>
    </div>
    <div class="mt-content">
      <slot></slot>
    </div>
  </div>
</template>


<style scoped lang="scss">
.mt-wrapper {
  position: relative;
  display: flex;
  flex-grow: 1;
  width: auto;
  height: auto;
  flex-direction: row;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 200;

  .mt-tabs {
    position: relative;
    padding: 100px 0px;
    margin: auto;
    margin-left: v-bind(tab_left_margin);
    width: v-bind(tab_width);
    min-width: v-bind(tab_width);
    max-width: v-bind(tab_width);
    height: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);

    .dbb-wrapper {
      height: 100px;
      margin: 0;
      z-index: 100;

      // &:hover {
      //   height: 110px;
      // }
    }

    .bk {
      position: absolute;
      width: 100%;
      top: 0px;
      bottom: 0px;
      z-index: 50;
      cursor: pointer;
      background-color: v-bind(bk_color);
      border-radius: 32px;
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.2);
      border: 1px solid rgb(255, 255, 255);
    }

    &:hover {
      padding: 110px 0px;

      .bk {
        box-shadow: 0px 10px 18px 6px rgba(0, 0, 0, 0.2);
        border: 1px solid v-bind(main_color);
      }
    }
  }


  .mt-content {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
}
</style>