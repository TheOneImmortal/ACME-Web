<script setup lang="ts">
import { Ref, inject, ref } from 'vue'


const props = withDefaults(defineProps<{
  type?: string
  pattern?: string
  prompt: string
  value: string
  step?: string
  symbol?: string
  enable?: boolean
  min?: number
  max?: number
  max_l?: number
  error?: string
}>(), { type: 'text', pattern: '*', step: '1', symbol: '', enable: true, min: -100000000, max: 100000000, max_l: 100, error: '' })

const emits = defineEmits<{
  input_update: [string]
  input_blur: []
}>()

const text_color = inject<Ref<string>>('text_color')
const main_color = inject<Ref<string>>('main_color')
const auxiliary_color = inject<Ref<string>>('auxiliary_color')
const main_color2 = inject<Ref<string>>('main_color2')
const auxiliary_color2 = inject<Ref<string>>('auxiliary_color2')
const bk_color = inject<Ref<string>>('bk_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')


const is_changed = ref(false)


function input_update(e: Event) {
  const input = (<HTMLInputElement>e.target)
  const next: string = input.value.length > props.max_l ? input.value.slice(0, props.max_l) : input.value
  input.value = next
  is_changed.value = true
  emits('input_update', next)
}
function input_blur() {
  if (!is_changed.value) return
  is_changed.value = false

  emits('input_blur')
}
</script>


<template>
  <div class="bi-wrapper">
    <div class="bi-item">
      <input :type="type" :step="step" :pattern="pattern" :required="value.length > 0" :value="value"
        @input="input_update" :disabled="!enable" :min="min" :max="max" @blur="input_blur" />
      <label>{{ prompt }}</label>
      <p :class="{ 'active': error.length > 0 }">{{ error }}</p>
    </div>
    <div class="bi-symbol">{{ symbol }}</div>
  </div>
</template>


<style scoped lang="scss">
.bi-wrapper {
  width: 100%;
  padding-top: 27px;
  margin-bottom: 18px;
  color: v-bind(auxiliary_color);
  // background-color: v-bind(bk_color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-weight: 300;

  .bi-item {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid v-bind(grey_color);


    input {
      width: 100%;
      padding: 7.2px 0px 2px 0px;
      border: none;
      font-size: 22px;
      font-weight: 300;
      caret-color: v-bind(main_color);
      background: transparent;

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &:valid:required {
        color: v-bind(main_color);

        &~.underline {
          background-color: v-bind(main_color);
        }
      }

      &:invalid {
        color: v-bind(main_color2);
        caret-color: v-bind(main_color2);
      }

      &:required {
        &~label {
          transform: translateY(-32px);
          font-size: 16px;
        }

        &~.underline {
          width: 100%;
        }
      }

      &:focus~.underline {
        width: 100%;
      }

    }

    label {
      position: absolute;
      left: 0;
      bottom: 2px;
      color: v-bind(dark_grey_color);
      font-size: 22px;
      transition: all 0.15s $ease-better;
      pointer-events: none;
    }

    p {
      position: absolute;
      left: 0;
      bottom: -10px;
      color: v-bind("main_color2 + '00'");
      font-size: 14px;
      transition: all 0.3s $ease-better;
      pointer-events: none;

      &.active {
        bottom: -22px;
        color: v-bind(main_color2);
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      bottom: -1px;
      left: 0px;
      border-bottom: 1px solid v-bind(main_color);
      transition: all 0.16s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    &:has(input:focus, input:required)::after {
      width: 100%;
    }

    &:has(input:invalid)::after {
      border-bottom: 1px solid v-bind(main_color2);
    }

    &:has(p.active)::after {
      width: 100%;
      border-bottom: 1px solid v-bind(main_color2);
    }
  }

  .bi-symbol {
    color: v-bind(dark_grey_color);
  }
}
</style>