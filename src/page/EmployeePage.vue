<script setup lang="ts">
import { Ref, inject, ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';


var employee_type = inject<Ref<number>>('employee_type');


var mode = ref(0); // 1: 创建报告 2: 采购订单 3:考勤卡 4:选择付款方式
</script>


<template>
  <div class="page-wrapper">
    <div class="mode-tab-wrapper">
      <DoubleBkButton :is_active="mode == 1" @clicked="mode = 1">创建报告</DoubleBkButton>
      <DoubleBkButton v-if="employee_type == 2" :is_active="mode == 2" @clicked="mode = 2">采购订单</DoubleBkButton>
      <DoubleBkButton v-else-if="employee_type == 0 || employee_type == 1" :is_active="mode == 3" @clicked="mode = 3">考勤卡
      </DoubleBkButton>
      <DoubleBkButton :is_active="mode == 4" @clicked="mode = 4">选择付款方式</DoubleBkButton>
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