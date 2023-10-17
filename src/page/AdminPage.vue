<script setup lang="ts">
import { Ref, computed, inject, ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ManageEmployee from './ManageEmployee.vue';
import ModeTab from '../components/ModeTab.vue';


var bk_color = inject<Ref<string>>('bk_color');


var tabs = ref([{
  mode: 1,
  name: '管理员工',
}, {
  mode: 2,
  name: '创建报告',
}])

var mode = ref(0); // 1: 管理员工 2: 创建报告
</script>


<template>
  <div class="page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0" />
    <ManageEmployee v-if="mode == 1" />
  </div>
</template>


<style scoped lang="scss">
.page-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}
</style>