<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import BeautifulInput from '../components/BeautifulInput.vue';


var main_color = inject<Ref<string>>('main_color')
var auxiliary_color = inject<Ref<string>>('auxiliary_color')


var tabs = ref([{
  mode: 1,
  name: '添加员工',
}, {
  mode: 2,
  name: '更新员工',
}, {
  mode: 3,
  name: '删除员工',
}])

var mode = ref(0) // 1: 添加员工 2: 更新员工 3: 删除员工
var state = ref(0)
var is_error = ref(false)
var error_message = ref('')


//#region 员工信息
var employee_name = ref('')
var employee_type = ref(0) // 0: H 1: S 2: C
var mailing_address = ref('')
var SSN = ref('')
var standard_tax_deduction = ref('')
var other_tax_deduction = ref('')
var phone_number = ref('')
var hourly_wage = ref('') // H
var wages = ref('') // S/C
var commission_rate = ref('') // C
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

function test_default_employee_info() {
  employee_type.value = Math.floor(Math.random() * 100) % 3
  mailing_address.value = '吉大'
  SSN.value = '1234'
  standard_tax_deduction.value = '5000'
  other_tax_deduction.value = '3000'
  phone_number.value = '11012345678'
  hourly_wage.value = '50'
  wages.value = '20000'
  commission_rate.value = '20'
}

function check_employee_info() {
  if (employee_name.value.length == 0) {
    error_message.value = '请输入员工姓名'
    return false
  }
  if (mailing_address.value.length == 0) {
    error_message.value = '请输入邮寄地址'
    return false
  }
  if (SSN.value.length == 0) {
    error_message.value = '请输入社会安全号码'
    return false
  }
  if (standard_tax_deduction.value.length == 0) {
    error_message.value = '请输入标准税收扣除'
    return false
  }
  if (other_tax_deduction.value.length == 0) {
    error_message.value = '请输入其他扣除'
    return false
  }
  if (phone_number.value.length == 0) {
    error_message.value = '请输入电话号码'
    return false
  }
  if ((employee_type.value == 0 && hourly_wage.value.length == 0)) {
    error_message.value = '请输入时薪'
    return false
  }
  if ((employee_type.value == 1 && wages.value.length == 0)) {
    error_message.value = '请输入工资'
    return false
  }
  if ((employee_type.value == 2 && commission_rate.value.length == 0)) {
    error_message.value = '请输入佣金率'
    return false
  }
  return true
}

function add_employee_button() {
  if (!check_employee_info()) {
    is_error.value = true
    return
  }

  state.value = 2
}

function update_employee_button() {
  if (!check_employee_info()) {
    is_error.value = true
    return
  }

  state.value = 5
}

function delete_employee_button() {
  state.value = 8
}

function add_employee_yes_button() {
  state.value = 1
  clear_employee_info()
}

function select_employee_button() {
  if (employee_name.value.length == 0) {
    error_message.value = '请输入员工ID'
    is_error.value = true
    return
  }

  state.value = 4
  test_default_employee_info()
}

function select_delete_employee_button() {
  if (employee_name.value.length == 0) {
    error_message.value = '请输入员工ID'
    is_error.value = true
    return
  }

  state.value = 7
  test_default_employee_info()
}

function update_employee_yes_button() {
  state.value = 3
  clear_employee_info()
}

function delete_employee_yes_button() {
  state.value = 6
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
      state.value = 6
      break
  }
})
</script>


<template>
  <div class="sub-page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0" />

    <div class="sub-page-content">
      <div v-if="is_error" class="mode-content">
        <label class="prompt">错误!</label>
        <label class="prompt">{{ error_message }}</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="is_error = false">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 1" class="mode-content">
        <BeautifulInput prompt="姓名" :value="employee_name" @input_update="(v) => employee_name = v" />
        <div class="type-select">
          <DoubleBkButton :is_active="employee_type == 0" @clicked="employee_type = 0">小时工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 1" @clicked="employee_type = 1">受薪工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 2" @clicked="employee_type = 2">委托工</DoubleBkButton>
        </div>
        <BeautifulInput prompt="邮寄地址" :value="mailing_address" @input_update="(v) => mailing_address = v" />
        <BeautifulInput prompt="社会安全号码" :value="SSN" @input_update="(v) => SSN = v" />
        <BeautifulInput prompt="标准税收扣除" :value="standard_tax_deduction" @input_update="(v) => standard_tax_deduction = v"
          symbol="元" />
        <BeautifulInput prompt="其他扣除" :value="other_tax_deduction" @input_update="(v) => other_tax_deduction = v"
          symbol="元" />
        <BeautifulInput prompt="电话号码" :value="phone_number" @input_update="(v) => phone_number = v" pattern="[0-9]+" />
        <BeautifulInput v-if="employee_type == 0" prompt="时薪" :value="hourly_wage" @input_update="(v) => hourly_wage = v"
          type="number" step="0.01" symbol="元" />
        <BeautifulInput v-if="employee_type == 1 || employee_type == 2" prompt="工资" :value="wages"
          @input_update="(v) => wages = v" type="number" step="0.01" symbol="元" />
        <BeautifulInput v-if="employee_type == 2" prompt="佣金率" :value="commission_rate"
          @input_update="(v) => commission_rate = v" type="number" step="0.01" symbol="%" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="add_employee_button">添加</DoubleBkButton>
      </div>
      <div v-else-if="state == 2" class="mode-content">
        <label class="prompt">员工ID为:</label>
        <label class="id">{{ employee_name }}</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="add_employee_yes_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 3" class="mode-content">
        <label class="prompt">欲更新员工ID为:</label>
        <BeautifulInput prompt="姓名" :value="employee_name" @input_update="(v) => employee_name = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="select_employee_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 4" class="mode-content">
        <BeautifulInput prompt="姓名" :value="employee_name" @input_update="(v) => employee_name = v" />
        <div class="type-select">
          <DoubleBkButton :is_active="employee_type == 0" @clicked="employee_type = 0">小时工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 1" @clicked="employee_type = 1">受薪工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 2" @clicked="employee_type = 2">委托工</DoubleBkButton>
        </div>
        <BeautifulInput prompt="邮寄地址" :value="mailing_address" @input_update="(v) => mailing_address = v" />
        <BeautifulInput prompt="社会安全号码" :value="SSN" @input_update="(v) => SSN = v" />
        <BeautifulInput prompt="标准税收扣除" :value="standard_tax_deduction" @input_update="(v) => standard_tax_deduction = v"
          symbol="元" />
        <BeautifulInput prompt="其他扣除" :value="other_tax_deduction" @input_update="(v) => other_tax_deduction = v"
          symbol="元" />
        <BeautifulInput prompt="电话号码" :value="phone_number" @input_update="(v) => phone_number = v" pattern="[0-9]+" />
        <BeautifulInput v-if="employee_type == 0" prompt="时薪" :value="hourly_wage" @input_update="(v) => hourly_wage = v"
          type="number" step="0.01" symbol="元" />
        <BeautifulInput v-if="employee_type == 1 || employee_type == 2" prompt="工资" :value="wages"
          @input_update="(v) => wages = v" type="number" step="0.01" symbol="元" />
        <BeautifulInput v-if="employee_type == 2" prompt="佣金率" :value="commission_rate"
          @input_update="(v) => commission_rate = v" type="number" step="0.01" symbol="%" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="update_employee_button">更新</DoubleBkButton>
      </div>
      <div v-else-if="state == 5" class="mode-content">
        <label class="prompt">已更新!</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="update_employee_yes_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 6" class="mode-content">
        <label class="prompt">欲删除员工ID为:</label>
        <BeautifulInput prompt="姓名" :value="employee_name" @input_update="(v) => employee_name = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="select_delete_employee_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 7" class="mode-content">
        <BeautifulInput prompt="姓名" :value="employee_name" @input_update="(v) => employee_name = v" :enable="false" />
        <div class="type-select">
          <DoubleBkButton :is_active="employee_type == 0">小时工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 1">受薪工</DoubleBkButton>
          <DoubleBkButton :is_active="employee_type == 2">委托工</DoubleBkButton>
        </div>
        <BeautifulInput prompt="邮寄地址" :value="mailing_address" @input_update="(v) => mailing_address = v"
          :enable="false" />
        <BeautifulInput prompt="社会安全号码" :value="SSN" @input_update="(v) => SSN = v" :enable="false" />
        <BeautifulInput prompt="标准税收扣除" :value="standard_tax_deduction" @input_update="(v) => standard_tax_deduction = v"
          symbol="元" :enable="false" />
        <BeautifulInput prompt="其他扣除" :value="other_tax_deduction" @input_update="(v) => other_tax_deduction = v"
          symbol="元" :enable="false" />
        <BeautifulInput prompt="电话号码" :value="phone_number" @input_update="(v) => phone_number = v" pattern="[0-9]+"
          :enable="false" />
        <BeautifulInput v-if="employee_type == 0" prompt="时薪" :value="hourly_wage" @input_update="(v) => hourly_wage = v"
          type="number" step="0.01" symbol="元" :enable="false" />
        <BeautifulInput v-if="employee_type == 1 || employee_type == 2" prompt="工资" :value="wages"
          @input_update="(v) => wages = v" type="number" step="0.01" symbol="元" :enable="false" />
        <BeautifulInput v-if="employee_type == 2" prompt="佣金率" :value="commission_rate"
          @input_update="(v) => commission_rate = v" type="number" step="0.01" symbol="%" :enable="false" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="delete_employee_button">删除</DoubleBkButton>
      </div>
      <div v-else-if="state == 8" class="mode-content">
        <label class="prompt">已删除!</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="delete_employee_yes_button">确定
        </DoubleBkButton>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.sub-page-wrapper {
  position: relative;
  display: flex;
  flex-grow: 1;

  .sub-page-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

    .mode-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

      .type-select {
        display: flex;
        width: 400px;
        height: 40px;
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
    }
  }
}
</style>