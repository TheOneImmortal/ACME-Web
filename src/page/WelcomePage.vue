<script setup lang="ts">
import { Ref, inject, ref } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue'
import Logo from '../components/Logo.vue'
import BeautifulInput from '../components/BeautifulInput.vue';
import axios from 'axios';


const text_color = inject<Ref<string>>('text_color')
const main_color = inject<Ref<string>>('main_color')
const auxiliary_color = inject<Ref<string>>('auxiliary_color')
const main_color2 = inject<Ref<string>>('main_color2')
const auxiliary_color2 = inject<Ref<string>>('auxiliary_color2')
const bk_color = inject<Ref<string>>('bk_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')

const is_admin = inject<Ref<boolean>>('is_admin')
const page_state = inject<Ref<number>>('page_state')
const employee_type = inject<Ref<number>>('employee_type')

const user_name = inject<Ref<string>>('user_name')
const password = ref('')

const is_waiting = ref(false)

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000
function admin_login() {
  is_waiting.value = true
  axios.post(
    'administrator/login', {
    username: user_name.value,
    password: password.value
  }).then((response) => {
    console.log(response.data);
    if (response.data.code == 1) {
      page_state.value = 2
    } else {
      alert('用户名或密码错误')
    }
  }).catch((error) => {
    alert(error)
  }).finally(() => {
    if (is_waiting)
      is_waiting.value = false
  });
}

function employee_login() {
  is_waiting.value = true
  axios.post(
    'employee/login', {
    username: user_name.value,
    password: password.value
  }).then((response) => {
    console.log(response.data);
    console.log(response.data.data);
    if (response.data.code == 1) {
      employee_type.value = response.data.data //根据员工类型更改界面
      
      page_state.value = 1
    } else {
      alert('用户名或密码错误')
    }
  }).catch((error) => {
    alert(error)
  }).finally(() => {
    if (is_waiting)
      is_waiting.value = false
  });
}

function login() {
  if (is_admin.value)
    admin_login()
  else
    employee_login()
}

function im_employee() {
  is_admin.value = false
  // page_state.value = 1
}

function im_admin() {
  is_admin.value = true
  // page_state.value = 1
}
</script>


<template>
  <div class="login-wrapper">
    <Logo class="logo" />
    <div class="login-box">
      <div class="tab-box">
        <div :class="{ tab: true, active: !is_admin }" @click="im_employee"> 员工 </div>
        <div :class="{ tab: true, active: is_admin }" @click="im_admin"> 管理员 </div>
        <div :class="{ line: true, right: is_admin }"></div>
      </div>
      <BeautifulInput type="text" pattern="*" prompt="姓名" :value="user_name" @input_update="(arg0) => user_name = arg0" />
      <BeautifulInput type="password" pattern="*" prompt="密码" :value="password"
        @input_update="(arg0) => password = arg0" />

      <DoubleBkButton :is_active="false" @clicked="login" :is_waiting="is_waiting">登录</DoubleBkButton>
    </div>
  </div>
</template>


<style scoped lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: v-bind(grey_color);
  color: v-bind(text_color);
  font-size: 50px;
  z-index: 100;

  .logo {
    height: 100px;
    margin: 40px 0;
  }

  .login-box {
    width: 612px;
    padding: 54px 126px 90px 126px;
    background-color: v-bind(bk_color);
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s $ease-better;

    .tab-box {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;

      .tab {
        color: v-bind(auxiliary_color2);
        padding: 18px;
        text-align: center;
        font-size: 28px;
        font-weight: 500;
        //transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

        &:hover {
          cursor: pointer;
        }

        &.active {
          font-weight: 800;
          color: v-bind(main_color);
        }
      }

      .line {
        position: absolute;
        width: 50%;
        height: 4.5px;
        left: 0%;
        bottom: 0;
        background-color: v-bind(main_color);
        transition: all 0.3s $ease-better;

        &.right {
          left: 50%;
        }
      }
    }
  }
}
</style>
