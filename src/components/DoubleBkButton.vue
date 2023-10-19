<script setup lang="ts">
import { Ref, inject, ref } from 'vue'


const props = withDefaults(defineProps<{
  is_active: boolean
  enable?: boolean
  mode?: 'click' | 'switch'
}>(), { enable: true, mode: 'click' })

const emits = defineEmits<{
  clicked: []
}>()


const text_color = inject<Ref<string>>('text_color')
const main_color = inject<Ref<string>>('main_color')
const auxiliary_color = inject<Ref<string>>('auxiliary_color')
const bk_color = inject<Ref<string>>('bk_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')


function clicked() {
  if (props.enable == false)
    return

  emits('clicked')
}
</script>


<template>
  <div :class="{ 'dbb-wrapper': true, 'active': is_active, 'enabled': enable, 'switch': mode == 'switch' }"
    @click="clicked">
    <div class="bk2" />
    <div class="bk" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>


<style scoped lang="scss">
.dbb-wrapper {
  position: relative;
  min-width: 100px;
  width: 100%;
  min-height: 50px;
  height: 100%;
  //border: 0;
  //outline: none;
  // box-shadow: 0px 0px 2px 0px v-bind("main_color + 'aa'");
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s $ease-better;
  z-index: 500;

  .bk {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: v-bind(dark_grey_color);
    transition: all 0.2s $ease-better;
    transition-delay: 0s;
    left: 0;
    z-index: 400;
  }

  .bk2 {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: v-bind(grey_color);
    transition: all 0.15s $ease-better;
    left: 0;
    z-index: 400;
  }

  .content {
    color: v-bind(dark_grey_color);
    position: relative;
    transition: all 0.15s $ease-better;
    z-index: 500;
  }


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

  &.switch {
    .bk {
      min-width: 4px;
    }
  }

  &.enabled {
    .bk {
      background-color: v-bind(main_color);
    }

    .bk2 {
      background-color: v-bind(auxiliary_color);
    }

    .content {
      color: v-bind(main_color)
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
      box-shadow: 0px 0px 6px v-bind("main_color + 'ff'");
    }

    &.active {
      box-shadow: 0px 0px 12px v-bind("main_color + 'ff'");
    }
  }
}
</style>