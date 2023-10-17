<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import BeautifulInput from '../components/BeautifulInput.vue';


var main_color = inject<Ref<string>>('main_color')
var auxiliary_color = inject<Ref<string>>('auxiliary_color')


var tabs = ref([{
  mode: 1,
  name: '创建采购订单',
}, {
  mode: 2,
  name: '更新采购订单',
}, {
  mode: 3,
  name: '删除采购订单',
}])

var mode = ref(0)
var state = ref(0)
var is_error = ref(false)
var error_message = ref('')


//#region 订单信息
var order_id = ref('')
var contact_person = ref('')
var biling_address = ref('')
var product_name = ref('')
var date = ref('')
//#endregion


function add_order() {
  // state.value = 1
}

function update_order() {
  // state.value = 2
}

function delete_order() {
  // state.value = 3
}


function clear_order_info() {
  contact_person.value = ''
  biling_address.value = ''
  product_name.value = ''
  date.value = ''
}

function test_default_order_info() {
  contact_person.value = '小明'
  biling_address.value = '吉大'
  product_name.value = '毕设真题'
  date.value = '13月1日'
}

function check_order_info() {
  if (contact_person.value.length == 0) {
    error_message.value = '请输入客户姓名'
    return false
  }
  if (biling_address.value.length == 0) {
    error_message.value = '请输入账单地址'
    return false
  }
  if (product_name.value.length == 0) {
    error_message.value = '请输入产品'
    return false
  }
  if (date.value.length == 0) {
    error_message.value = '请输入日期'
    return false
  }
  return true
}

function add_order_button() {
  if (!check_order_info()) {
    is_error.value = true
    return
  }

  order_id.value = Math.floor(Math.random() * 100).toString()
  state.value = 2
}

function update_order_button() {
  if (!check_order_info()) {
    is_error.value = true
    return
  }

  state.value = 5
}

function delete_order_button() {
  state.value = 8
}

function add_order_yes_button() {
  state.value = 1
  clear_order_info()
}

function select_order_button() {
  if (order_id.value.length == 0) {
    error_message.value = '请输入订单ID'
    is_error.value = true
    return
  }

  state.value = 4
  test_default_order_info()
}

function select_delete_order_button() {
  if (order_id.value.length == 0) {
    error_message.value = '请输入订单ID'
    is_error.value = true
    return
  }

  state.value = 7
  test_default_order_info()
}

function update_order_yes_button() {
  state.value = 3
  clear_order_info()
}

function delete_order_yes_button() {
  state.value = 6
  clear_order_info()
}


watch(mode, (new_value, old_value) => {
  switch (new_value) {
    default:
      state.value = 0
      break
    case 1:
      state.value = 1
      clear_order_info()
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
        <BeautifulInput prompt="联系人" :value="contact_person" @input_update="(v) => contact_person = v" />
        <BeautifulInput prompt="账单地址" :value="biling_address" @input_update="(v) => biling_address = v" />
        <BeautifulInput prompt="产品" :value="product_name" @input_update="(v) => product_name = v" />
        <BeautifulInput prompt="日期" :value="date" @input_update="(v) => date = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="add_order_button">添加</DoubleBkButton>
      </div>
      <div v-else-if="state == 2" class="mode-content">
        <label class="prompt">订单ID为:</label>
        <label class="id">{{ order_id }}</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="add_order_yes_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 3" class="mode-content">
        <label class="prompt">欲更新订单ID为:</label>
        <BeautifulInput prompt="订单ID" :value="order_id" @input_update="(v) => order_id = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="select_order_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 4" class="mode-content">
        <BeautifulInput prompt="联系人" :value="contact_person" @input_update="(v) => contact_person = v" />
        <BeautifulInput prompt="账单地址" :value="biling_address" @input_update="(v) => biling_address = v" />
        <BeautifulInput prompt="产品" :value="product_name" @input_update="(v) => product_name = v" />
        <BeautifulInput prompt="日期" :value="date" @input_update="(v) => date = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="update_order_button">添加</DoubleBkButton>
      </div>
      <div v-else-if="state == 5" class="mode-content">
        <label class="prompt">已更新!</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="update_order_yes_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 6" class="mode-content">
        <label class="prompt">欲删除订单ID为:</label>
        <BeautifulInput prompt="订单ID" :value="order_id" @input_update="(v) => order_id = v" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="select_delete_order_button">确定
        </DoubleBkButton>
      </div>
      <div v-else-if="state == 7" class="mode-content">
        <BeautifulInput prompt="联系人" :value="contact_person" @input_update="(v) => contact_person = v" :enable="false" />
        <BeautifulInput prompt="账单地址" :value="biling_address" @input_update="(v) => biling_address = v" :enable="false" />
        <BeautifulInput prompt="产品" :value="product_name" @input_update="(v) => product_name = v" :enable="false" />
        <BeautifulInput prompt="日期" :value="date" @input_update="(v) => date = v" :enable="false" />
        <DoubleBkButton class="yes" :is_active="false" @clicked="delete_order_button">删除</DoubleBkButton>
      </div>
      <div v-else-if="state == 8" class="mode-content">
        <label class="prompt">已删除!</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="delete_order_yes_button">确定
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