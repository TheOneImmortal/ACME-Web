<script setup lang="ts">
import { Ref, computed, inject, ref } from 'vue';


const main_color = inject<Ref<string>>('main_color');
const auxiliary_color = inject<Ref<string>>('auxiliary_color');

// setInterval(() => { lb_color.value = main_color.value }, 30);


</script>


<template>
  <div class="lb-wrapper"></div>
</template>


<style scoped lang="scss">
.lb-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  background-image: radial-gradient(closest-side, v-bind(main_color), transparent);
  background-repeat: no-repeat;
  background-size: 200vmax 200vmax;
  background-position: calc(50vw - 100vmax) 0vh;
  background-color: v-bind("auxiliary_color + '22'");
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  animation: lb-bksize 3s cubic-bezier(0.25, 0.1, 0.25, 1) 0s infinite alternate;
}

@keyframes lb-bksize {
  0% {
    background-size: 180vmax 180vmax;
    background-position: calc(50vw - 90vmax) calc(150vh - 90vmax);
  }

  100% {
    background-size: 220vmax 220vmax;
    background-position: calc(50vw - 110vmax) calc(150vh - 110vmax);
  }
}
</style>