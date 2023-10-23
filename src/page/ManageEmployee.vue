<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import axios from 'axios';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import BeautifulInput from '../components/BeautifulInput.vue';
import FocusCard from '../components/FocusCard.vue';


const main_color = inject<Ref<string>>('main_color')
const auxiliary_color = inject<Ref<string>>('auxiliary_color')
const bk_color = inject<Ref<string>>('bk_color')




const tabs = ref([{
  mode: 1,
  name: '添加员工',
}, {
  mode: 2,
  name: '更新员工',
}, {
  mode: 3,
  name: '删除员工',
}])

const mode = ref(0) // 1: 添加员工 2: 更新员工 3: 删除员工
const state = ref(0)
const is_error = ref(false)
const error_message = ref('')


//#region 员工信息
const employee_id = ref('')
const employee_name = ref('')
const employee_name_error = ref('')
const employee_type = ref(0) // 0: H 1: S 2: C

const mailing_address = ref('')
const mailing_address_error = ref('')
const SSN = ref('')
const SSN_error = ref('')
const standard_tax_deduction = ref('')
const standard_tax_deduction_error = ref('')
const other_tax_deduction = ref('')
const other_tax_deduction_error = ref('')
const phone_number = ref('')
const phone_number_error = ref('')
const hourly_wage = ref('') // H
const hourly_wage_error = ref('') // H
const wages = ref('') // S/C
const wages_error = ref('') // S/C
const commission_rate = ref('') // C
const commission_rate_error = ref('') // C
//#endregion


function add_employee() {
  // state.value = 1
}

function update_employee() {
  // state.value = 2
}

function delete_employee() {
  // state.value = 3
}


function clear_employee_info() {
  employee_name.value = ''
  mailing_address.value = ''
  SSN.value = ''
  standard_tax_deduction.value = ''
  other_tax_deduction.value = ''
  phone_number.value = ''
  hourly_wage.value = ''
  wages.value = ''
  commission_rate.value = ''
}

function test_default_employee_info(data) {
  console.log(data)
  employee_name.value = data.name
  employee_type.value = data.employee_type
  mailing_address.value = data.mailing_address
  SSN.value = data.social_security_number
  standard_tax_deduction.value = data.standard_tax_deduction.toString()
  other_tax_deduction.value = (data.other_tax_deduction as number).toString()
  phone_number.value = data.phone
  hourly_wage.value = data.salary.toString()//时薪（小时工特有）或工资（一般员工都有
  wages.value = data.salary.toString()
  commission_rate.value = data.commission_rate == null ? null : data.commission_rate.toString()//佣金率（绩效员工独有）
}

function check_employee_name() {
  if (employee_name.value.length == 0) {
    employee_name_error.value = '请输入员工姓名'
    return false
  }
  return true
}

function check_SSN() {
  if (SSN.value.length == 0) {
    SSN_error.value = '请输入员工SSN'
    return false
  } else if (SSN.value.length != 9) {
    SSN_error.value = 'SSN长度应为9位'
    return false
  }
  return true
}

function check_standard_tax_deduction(){
  if (standard_tax_deduction.value.length == 0) {
    standard_tax_deduction_error.value = '请输入税率'
    return false
  }
  if (isNaN(Number(standard_tax_deduction.value)) || standard_tax_deduction.value[0] == '-' || Number(standard_tax_deduction.value) > 100){
    standard_tax_deduction_error.value = '税率输入有误'
    return false
  }
  return true
}

function check_employee_info() {
  var is_no_error = true
  if (!check_employee_name()) {
    error_message.value = '请检查输入'
    is_no_error = false
  }
  if (mailing_address.value.length == 0) {
    error_message.value = '请检查输入'
    mailing_address_error.value = '请输入邮寄地址'
    is_no_error = false
  }
  if (!check_SSN()) {
    error_message.value = '请检查输入'
    is_no_error = false
  }
  if (!check_standard_tax_deduction()) {
    error_message.value = '请检查输入'
    is_no_error = false
  }
  if (other_tax_deduction.value.length == 0) {
    error_message.value = '请检查输入'
    other_tax_deduction_error.value = '请输入其他扣除'
    is_no_error = false
  }
  if (phone_number.value.length == 0) {
    error_message.value = '请检查输入'
    phone_number_error.value = '请输入电话号码'
    is_no_error = false
  }
  if ((employee_type.value == 0 && hourly_wage.value.length == 0)) {
    error_message.value = '请检查输入'
    hourly_wage_error.value = '请输入时薪'
    is_no_error = false
  }
  if (((employee_type.value == 1 || employee_type.value == 2) && wages.value.length == 0)) {
    error_message.value = '请检查输入'
    wages_error.value = '请输入工资'
    is_no_error = false
  }
  if ((employee_type.value == 2 && commission_rate.value.length == 0)) {
    error_message.value = '请检查输入'
    commission_rate_error.value = '请输入佣金率'
    is_no_error = false
  }
  return is_no_error
}

axios.defaults.baseURL = '/api'
function change_employee(data_employee_id){
  return axios({
    method: mode.value == 1 ? 'post' : mode.value == 2 ? 'put' : 'delete',
    url: 'employee/change',
    data: {
      name: employee_name.value,
      username: data_employee_id == null ? null : data_employee_id.value,
      employee_type:employee_type.value,
      mailing_address: mailing_address.value,
      social_security_number: SSN.value,
      standard_tax_deduction: standard_tax_deduction.value,
      other_tax_deduction: other_tax_deduction.value,
      salary: employee_type.value == 0 ? hourly_wage.value : wages.value,
      phone: phone_number.value,
      commission_rate: employee_type.value == 2 ? commission_rate.value : null
    },
  })
}
function request_employee_by_username(){
  return axios({
    method: 'get',
    url: 'employee/username',
    params: {
      username: employee_id.value
    }
  })
}

function add_employee_button() {
  if (!check_employee_info()) {
    return
  }
  change_employee(null).then(
    (response) => {
      if (response.data.code == 1){
        state.value = 2
        employee_name.value = response.data.data.username //回显用户名
      }
    }
  ).catch()

  
}

function update_employee_button() {
  if (!check_employee_info()) {
    return
  }
  change_employee(employee_id).then(
    (response) => {
      if (response.data.code == 1){
        state.value = 4
      }
    }
  )
  
}

function delete_employee_button() {
  change_employee(employee_id).then(
    (response) => {
      if (response.data.code == 1){
        state.value = 4
      }
    }
  )
}

function add_employee_yes_button() {
  state.value = 1
  clear_employee_info()
}

function select_employee_button() {
  if (employee_id.value.length == 0) {
    error_message.value = '请输入员工用户名'
    is_error.value = true
    return
  }
  request_employee_by_username().then(
    (response) => {
      if (response.data.code == 1){
        state.value = 1
        test_default_employee_info(response.data.data)
      } else {
        alert("查询用户不存在")
      }
    }
  )

  
}

function select_delete_employee_button() {
  if (employee_id.value.length == 0) {
    error_message.value = '请输入员工用户名'
    is_error.value = true
    return
  }
  request_employee_by_username().then(
    (response) => {
      if (response.data.code == 1){
        state.value = 1
        test_default_employee_info(response.data.data)
      } else {
        alert("查询用户不存在")
      }
    }
  )
}

function update_employee_yes_button() {
  state.value = 3
  clear_employee_info()
}

function delete_employee_yes_button() {
  state.value = 3
  clear_employee_info()
}


watch(mode, (new_value, old_value) => {
  switch (new_value) {
    default:
      state.value = 0
      break
    case 1:
      state.value = 1
      clear_employee_info()
      break
    case 2:
      state.value = 3
      break
    case 3:
      state.value = 3
      break
  }
})
</script>


<template>
  <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0">
    <FocusCard v-if="is_error">
      <label class="prompt">错误!</label>
      <label class="prompt">{{ error_message }}</label>
      <DoubleBkButton class="yes" :is_active="false" @clicked="is_error = false">确定
      </DoubleBkButton>
    </FocusCard>
    <FocusCard v-else-if="state == 1">
      <BeautifulInput prompt="姓名" :value="employee_name"
        @input_update="(v) => { employee_name = v; employee_name_error = '' }" :enable="mode != 3"
        :error="employee_name_error" @input_blur="check_employee_name" />
      <div class="type-select">
        <DoubleBkButton :is_active="employee_type == 0" @clicked="employee_type = 0">小时工</DoubleBkButton>
        <DoubleBkButton :is_active="employee_type == 1" @clicked="employee_type = 1">受薪工</DoubleBkButton>
        <DoubleBkButton :is_active="employee_type == 2" @clicked="employee_type = 2">委托工</DoubleBkButton>
      </div>
      <BeautifulInput prompt="邮寄地址" :value="mailing_address"
        @input_update="(v) => { mailing_address = v; mailing_address_error = '' }" :enable="mode != 3"
        :error="mailing_address_error" />
      <BeautifulInput prompt="SSN" :value="SSN" @input_update="(v) => { SSN = v; SSN_error = '' }" :max_l="9"
        :enable="mode != 3" :error="SSN_error" @input_blur="check_SSN" />
      <BeautifulInput prompt="税率" :value="standard_tax_deduction"
        @input_update="(v) => { standard_tax_deduction = v; standard_tax_deduction_error = '' }" type="number" step="0.01"
        :min="0" :max="99.99" symbol="%" :enable="mode != 3" :error="standard_tax_deduction_error" @input_blur="check_standard_tax_deduction" />
      <BeautifulInput prompt="其他扣除" :value="other_tax_deduction"
        @input_update="(v) => { other_tax_deduction = v; other_tax_deduction_error = '' }" type="number" step="0.01"
        :min="0" symbol="元" :enable="mode != 3" :error="other_tax_deduction_error" />
      <BeautifulInput prompt="电话号码" :value="phone_number"
        @input_update="(v) => { phone_number = v; phone_number_error = '' }" pattern="[0-9]+" :enable="mode != 3"
        :error="phone_number_error" />
      <BeautifulInput v-if="employee_type == 0" prompt="时薪" :value="hourly_wage"
        @input_update="(v) => { hourly_wage = v; hourly_wage_error = '' }" type="number" step="0.01" symbol="元"
        :enable="mode != 3" :error="hourly_wage_error" />
      <BeautifulInput v-if="employee_type == 1 || employee_type == 2" prompt="工资" :value="wages"
        @input_update="(v) => { wages = v; wages_error = '' }" type="number" step="0.01" symbol="元" :enable="mode != 3"
        :error="wages_error" />
      <BeautifulInput v-if="employee_type == 2" prompt="佣金率" :value="commission_rate"
        @input_update="(v) => { commission_rate = v; commission_rate_error = '' }" type="number" step="0.01" symbol="%"
        :enable="mode != 3" :error="commission_rate_error" />
      <DoubleBkButton v-if="mode == 1" class="yes" :is_active="false" @clicked="add_employee_button">添加</DoubleBkButton>
      <DoubleBkButton v-else-if="mode == 2" class="yes" :is_active="false" @clicked="update_employee_button">更新
      </DoubleBkButton>
      <DoubleBkButton v-else-if="mode == 3" class="yes" :is_active="false" @clicked="delete_employee_button">删除
      </DoubleBkButton>
    </FocusCard>
    <FocusCard v-else-if="state == 2">
      <label class="prompt">员工用户名为:</label>
      <label class="id">{{ employee_name }}</label>
      <DoubleBkButton class="yes" :is_active="false" @clicked="add_employee_yes_button">确定
      </DoubleBkButton>
    </FocusCard>
    <FocusCard v-else-if="state == 3">
      <label class="prompt">欲{{ mode == 2 ? '更新' : '删除' }}员工用户名为:</label>
      <BeautifulInput prompt="ID" :value="employee_id" @input_update="(v) => employee_id = v" />
      <DoubleBkButton class="yes" :is_active="false"
        @clicked="mode == 2 ? select_employee_button() : select_delete_employee_button()">确定
      </DoubleBkButton>
    </FocusCard>
    <FocusCard v-else-if="state == 4">
      <label class="prompt">已{{ mode == 2 ? '更新' : '删除' }}!</label>
      <DoubleBkButton class="yes" :is_active="false"
        @clicked="mode == 2 ? update_employee_yes_button() : delete_employee_yes_button()">确定
      </DoubleBkButton>
    </FocusCard>
  </ModeTab>
</template>


<style scoped lang="scss">
.type-select {
  display: flex;
  width: 400px;
  height: 40px;
  margin: 20px 0px;
}

.bi-wrapper {
  width: 400px;
}

.yes {
  width: 300px;
  height: 60px;
}

.prompt {
  font-size: 24px;
  color: v-bind(auxiliary_color)
}

.id {
  font-size: 64px;
  color: v-bind(main_color);
  margin: 50px 0px;
}

.yes {
  width: 300px;
  height: 60px;
}
</style>