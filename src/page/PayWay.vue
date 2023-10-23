<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue';
import FocusCard from '@/components/FocusCard.vue';
import BeautifulInput from '@/components/BeautifulInput.vue';
import axios from 'axios';
import { userInfo } from 'os';
var mode = ref(0)
var pay_method = ref(0);
var commit = ref(0);
const user_name = inject<Ref<string>>('user_name')

axios.defaults.baseURL = '/api'
function change_employee(){
  axios({
    method: 'put',
    url: 'employee/change',
    data: {
      username: user_name.value,
      payment:pay_method.value,
      mailing_address: pay_method.value == 0 || pay_method.value == 2 ? null : mail_pos.value,
      bank: pay_method.value == 0 || pay_method.value == 1 ? null : bank.value,
      bank_id: pay_method.value == 0 || pay_method.value == 1 ? null : id.value,
    },
  }).then((response) => {
    if(response.data.code == 1){
      alert("修改成功")
    }
  })
}

function request_employee_by_username(){
  axios({
    method: 'get',
    url: 'employee/username',
    params: {
      username: user_name.value
    }
  }).then((response) => {
    if(response.data.code == 1){
      console.log(response.data.data)
      pay_method.value = response.data.data.payment,
      mail_pos.value = response.data.data.mailing_address == null ? "" : response.data.data.mailing_address
      bank.value = response.data.data.bank == null ? "" : response.data.data.bank
      id.value = response.data.data.bank_id == null ? "" : response.data.data.bank_id
    }
  })
}
request_employee_by_username()

const mail_pos = ref('')
const bank = ref('')
const id = ref('')
</script>

<template>
  <FocusCard>
    <div class="type-select">
      <DoubleBkButton :is_active="pay_method == 0" @clicked="pay_method = 0">领取</DoubleBkButton>
      <DoubleBkButton :is_active="pay_method == 1" @clicked="pay_method = 1">邮寄</DoubleBkButton>
      <DoubleBkButton :is_active="pay_method == 2" @clicked="pay_method = 2">直接存款</DoubleBkButton>
    </div>
    <label v-if="pay_method == 0"><br /> 直接找老板</label>
    <BeautifulInput v-if="pay_method == 1" prompt="邮寄地址" type="text" :value="mail_pos"
      @input_update="(arg0) => mail_pos = arg0" />
    <BeautifulInput v-if="pay_method == 2" prompt="汇款银行" type="text" :value="bank"
      @input_update="(arg0) => bank = arg0" />
    <BeautifulInput v-if="pay_method == 2" prompt="账号" type="text" :value="id" @input_update="(arg0) => id = arg0" />
    <br />
    <DoubleBkButton :is_active=false @clicked="change_employee">提交</DoubleBkButton>
  </FocusCard>
</template>


<style scoped lang="scss">
.bi-wrapper {
  width: 400px;
}

.type-select {
  display: flex;
  width: 400px;
  height: 40px;
  margin: 20px 0px;
}

.mode-right {
  width: 100%;
  height: 20%;
  margin-top: 10%;
  display: flex;
}

.mode-middle {
  height: 30%;
  margin-top: 10%;
  margin-bottom: 10%;
  display: flex;

  .input-container {
    display: flex;
    margin-left: 10%;
    width: 100%;

    .custom-input {
      margin-left: 5%;
      width: 40%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
      font-size: 16px;
      color: #333;
      transition: border-color 0.3s ease;
    }

    .custom-input::placeholder {
      color: #999;
    }

    .custom-input:focus {
      border-color: #007BFF;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
}

.mode-bottom {
  height: 10%;
  margin-top: 20%;
  margin-left: 55%;
  margin-right: 5%;
  margin-bottom: 5%;
  display: flex;
}
</style>