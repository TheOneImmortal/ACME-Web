<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import MaintainPurchaseOrder from './MaintainPurchaseOrder.vue';
import UserReport from './UserReport.vue';
import PayWay from './PayWay.vue';
import TimeCard from './TimeCard.vue';
import ChangePassword from './ChangePassword.vue';


var employee_type = inject<Ref<number>>('employee_type');
var page_state = inject<Ref<number>>('page_state');


var tabs = ref(
  (employee_type.value == 0 || employee_type.value == 1) ?
    [{ mode: 1, name: '创建报告' },
    { mode: 3, name: '考勤卡' },
    { mode: 4, name: '选择付款方式', },
    { mode: 6, name: '修改密码', },
    { mode: 5, name: '退出', },] :
    [{ mode: 1, name: '创建报告' },
    { mode: 2, name: '采购订单' },
    { mode: 4, name: '选择付款方式' },
    { mode: 6, name: '修改密码', },
    { mode: 5, name: '退出', },])


var mode = ref(0); // 1: 创建报告 2: 采购订单 3:考勤卡 4:选择付款方式

import axios from 'axios';
function logout(){//添加员工登出时的请求处理
  console.log("logouting")
  axios.post('administrator/logout')
  .then((response) => {
  })
}

watch(mode, (new_value) => {
  switch (new_value) {
    case 5:
      logout()
      page_state.value = 0
      break
  }
})
</script>


<template>
  <div class="page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0">
      <UserReport v-if="mode == 1" />
      <MaintainPurchaseOrder v-else-if="mode == 2" />
      <TimeCard v-else-if="mode == 3" />
      <PayWay v-else-if="mode == 4" />
      <ChangePassword v-else-if="mode == 6" />
    </ModeTab>
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