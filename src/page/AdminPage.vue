<script setup lang="ts">
import { Ref, computed, inject, ref, watch } from 'vue';
import ManageEmployee from './ManageEmployee.vue';
import ModeTab from '../components/ModeTab.vue';
import ManageReport from './ManageReport.vue';
import WelcomePage from './WelcomePage.vue'
import axios from 'axios';

const bk_color = inject<Ref<string>>('bk_color');
const page_state = inject<Ref<number>>('page_state');


const tabs = ref([{
  mode: 1,
  name: '管理员工',
}, {
  mode: 2,
  name: '创建报告',
}, {
  mode: 3,
  name: '退出',
},])

const mode = ref(0); // 1: 管理员工 2: 创建报告

function logout(){//添加员工登出时的请求处理
  console.log("logouting")
  axios.post('administrator/logout')
  .then((response) => {
  })
}

watch(mode, (new_value) => {
  switch (new_value) {
    case 3:
      logout()//添加员工登出时的请求处理
      page_state.value = 0
      break
  }
})
</script>


<template>
  <div class="page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => (mode = arg0)">
      <ManageEmployee v-if="mode == 1" />
      <ManageReport v-else-if="mode == 2" />
    </ModeTab>
  </div>
</template>


<style scoped lang="scss">
.page-wrapper {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-grow: 1;
}
</style>