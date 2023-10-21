<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import EmployeePage from './page/EmployeePage.vue'
import WelcomePage from './page/WelcomePage.vue'
import AdminPage from './page/AdminPage.vue';
import LightingBk from './components/LightingBk.vue';


//#region 颜色
const text_color = ref('#ffffff')
const main_color = ref('#1e90ff')
const auxiliary_color = ref('#70a1ff')
const main_color2 = ref('#ff4757')
const auxiliary_color2 = ref('#ff6b81')
const bk_color = ref('#ffffff')
const grey_color = ref('#ECECEC')
const dark_grey_color = ref('#b3b3b3')
//#endregion
//#region 用户信息
const user_name = ref('')
const is_login = ref(false)
const is_admin = ref(false)
const employee_type = ref(0) // 0:H 1:S 2:C
const page_state = ref(0) // 0:未登录 1:员工 2:管理员
//#endregion

//#region 导出全局变量
provide('text_color', text_color)
provide('main_color', computed(() => !(is_admin.value) ? main_color.value : main_color2.value))
provide('auxiliary_color', computed(() => !(is_admin.value) ? auxiliary_color.value : auxiliary_color2.value))
provide('main_color2', computed(() => (!is_admin.value) ? main_color2.value : main_color.value))
provide('auxiliary_color2', computed(() => !(is_admin.value) ? auxiliary_color2.value : auxiliary_color.value))
provide('bk_color', bk_color)
provide('grey_color', grey_color)
provide('dark_grey_color', dark_grey_color)
provide('user_name', user_name)
provide('is_login', is_login)
provide('is_admin', is_admin)
provide('employee_type', employee_type)
provide('page_state', page_state)
//#endregion


</script>

<template>
  <WelcomePage v-if="page_state == 0" />
  <EmployeePage v-else-if="page_state == 1" />
  <AdminPage v-else-if="page_state == 2" />
  <LightingBk />
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
