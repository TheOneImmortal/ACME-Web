<script setup lang="ts">
import { Ref, inject, ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import MaintainPurchaseOrder from './MaintainPurchaseOrder.vue';


var employee_type = inject<Ref<number>>('employee_type');


var tabs = ref(
  (employee_type.value == 0 || employee_type.value == 1) ?
    [{ mode: 1, name: '创建报告' },
    { mode: 3, name: '考勤卡' },
    { mode: 4, name: '选择付款方式' }] :
    [{ mode: 1, name: '创建报告' },
    { mode: 2, name: '采购订单' },
    { mode: 4, name: '选择付款方式' }])


var mode = ref(0); // 1: 创建报告 2: 采购订单 3:考勤卡 4:选择付款方式


</script>


<template>
  <div class="page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0" />
    <MaintainPurchaseOrder v-if="mode == 2" />
  </div>
</template>


<style scoped lang="scss">
.page-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
}
</style>