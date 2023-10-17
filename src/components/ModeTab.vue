<script setup lang="ts">
import { Ref, computed, inject, ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';


var props = defineProps<{
  modes: {
    mode: number; // 从1开始
    name: string;
  }[]
}>()

var emits = defineEmits<{
  mode_update: [number]
}>()


var auxiliary_color = inject<Ref<string>>('auxiliary_color');
var bk_color = inject<Ref<string>>('bk_color');


var mode = ref(0);

var tab_width = computed(() => mode.value == 0 ? '400px' : '200px');
</script>


<template>
  <div class="mt-wrapper">
    <DoubleBkButton v-for="item in modes" :key="item.mode" :is_active="mode == item.mode" @clicked="$emit('mode_update',
      mode = item.mode)">
      {{ item.name }}</DoubleBkButton>
    <div class="bk" @click="$emit('mode_update', mode = 0)"></div>
  </div>
</template>


<style scoped lang="scss">
.mt-wrapper {
  position: static;
  width: v-bind(tab_width);
  min-width: v-bind(tab_width);
  max-width: v-bind(tab_width);
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  z-index: 1;

  .dbb-wrapper {
    height: 100px;
    margin: 0;
    z-index: 1;

    &:hover {
      height: 110px;
    }
  }

  .bk {
    position: absolute;
    width: v-bind(tab_width);
    height: 100%;
    z-index: -1;
    cursor: pointer;
  }
}
</style>