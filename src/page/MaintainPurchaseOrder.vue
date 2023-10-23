<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import ModeTab from '../components/ModeTab.vue';
import BeautifulInput from '../components/BeautifulInput.vue';
import FocusCard from '@/components/FocusCard.vue';
import axios from 'axios';

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
var contact_person_error = ref('')
var biling_address = ref('')
var biling_address_error = ref('')
var product_name = ref('')
var product_name_error = ref('')
var price = ref('')
var price_error = ref('')
var date = ref('')
var date_error = ref('')
//#endregion
const user_name = inject<Ref<string>>('user_name')

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

function test_default_order_info(data) {
  contact_person.value = data.contact_person
  biling_address.value = data.biling_address
  product_name.value = data.product_name
  date.value = data.create_date
  price.value = data.price
}

function check_order_info() {
  var is_no_error = true
  if (contact_person.value.length == 0) {
    contact_person_error.value = '请输入联系人姓名'
    is_no_error = false
  }
  if (biling_address.value.length == 0) {
    biling_address_error.value = '请输入账单地址'
    is_no_error = false
  }
  if (price.value.length == 0) {
    price_error.value = '请输入价格'
    is_no_error = false
  }
  if (product_name.value.length == 0) {
    product_name_error.value = '请输入产品'
    is_no_error = false
  }
  if (date.value.length == 0) {
    date_error.value = '请输入日期'
    is_no_error = false
  }
  return is_no_error
}

axios.defaults.baseURL = '/api'
function change_employee(){
  return axios({
    method: mode.value == 1 ? 'post' : mode.value == 2 ? 'put' : 'delete',
    url: 'order/change',
    data: {
      employee_id : user_name.value,
      contact_person: contact_person.value,
      biling_address: biling_address.value,
      product_name: product_name.value,
      create_date: date.value,
      price: price.value
    }
  })
}
function request_order_by_id(){
  return axios({
    method: 'get',
    url: 'order/id',
    params: {
      id: order_id.value
    }
  })
}

function add_order_button() {
  if (!check_order_info()) {
    return
  }
  change_employee().then((response) => {
    if(response.data.code == 1){
      order_id.value = response.data.data.id
      state.value = 2
    }
  })
  
}

function update_order_button() {
  if (!check_order_info()) {
    return
  }

  state.value = 4
}

function delete_order_button() {
  state.value = 4
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
  request_order_by_id().then((response) => {
    if(response.data.code == 1){
      state.value = 1
      test_default_order_info(response.data.data)
    }
  })

  
}

function select_delete_order_button() {
  if (order_id.value.length == 0) {
    error_message.value = '请输入订单ID'
    is_error.value = true
    return
  }
  request_order_by_id().then((response) => {
    if(response.data.code == 1){
      state.value = 1
      test_default_order_info(response.data.data)
    }
  })
}

function update_order_yes_button() {
  state.value = 3
  clear_order_info()
}

function delete_order_yes_button() {
  state.value = 3
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
      state.value = 3
      break
  }
})
</script>


<template>
  <div class="sub-page-wrapper">
    <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0">
      <FocusCard v-if="is_error">
        <label class="prompt">错误!</label>
        <label class="prompt">{{ error_message }}</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="is_error = false">确定
        </DoubleBkButton>
      </FocusCard>
      <FocusCard v-else-if="state == 1">
        <BeautifulInput prompt="联系人" :value="contact_person"
          @input_update="(v) => { contact_person = v; contact_person_error = '' }" :enable="mode != 3"
          :error="contact_person_error" />
        <BeautifulInput prompt="账单地址" :value="biling_address"
          @input_update="(v) => { biling_address = v; biling_address_error = '' }" :enable="mode != 3"
          :error="biling_address_error" />
        <BeautifulInput prompt="产品" :value="product_name"
          @input_update="(v) => { product_name = v; product_name_error = '' }" :enable="mode != 3"
          :error="product_name_error" />
        <BeautifulInput prompt="总价格" :value="price"
          @input_update="(v) => { price = v; price_error = '' }" :enable="mode != 3"
          :error="price_error" />
        <BeautifulInput prompt="日期" :value="date" @input_update="(v) => { date = v; date_error = '' }" :enable="mode != 3"
          :error="date_error" />
        <DoubleBkButton v-if="mode == 1" class="yes" :is_active="false" @clicked="add_order_button">添加</DoubleBkButton>
        <DoubleBkButton v-else-if="mode == 2" class="yes" :is_active="false" @clicked="update_order_button">更新
        </DoubleBkButton>
        <DoubleBkButton v-else-if="mode == 3" class="yes" :is_active="false" @clicked="delete_order_button">删除
        </DoubleBkButton>
      </FocusCard>
      <FocusCard v-else-if="state == 2">
        <label class="prompt">订单ID为:</label>
        <label class="id">{{ order_id }}</label>
        <DoubleBkButton class="yes" :is_active="false" @clicked="add_order_yes_button">确定
        </DoubleBkButton>
      </FocusCard>
      <FocusCard v-else-if="state == 3">
        <label class="prompt">欲{{ mode == 2 ? '更新' : '删除' }}订单ID为:</label>
        <BeautifulInput prompt="订单ID" :value="order_id" @input_update="(v) => order_id = v" />
        <DoubleBkButton v-if="mode == 2" class="yes" :is_active="false" @clicked="select_order_button">确定
        </DoubleBkButton>
        <DoubleBkButton v-else-if="mode == 3" class="yes" :is_active="false" @clicked="select_delete_order_button">确定
        </DoubleBkButton>
      </FocusCard>
      <FocusCard v-else-if="state == 4">
        <label class="prompt">已{{ mode == 2 ? '更新' : '删除' }}!</label>
        <DoubleBkButton v-if="mode == 2" class="yes" :is_active="false" @clicked="update_order_yes_button">确定
        </DoubleBkButton>
        <DoubleBkButton v-else-if="mode == 3" class="yes" :is_active="false" @clicked="delete_order_yes_button">确定
        </DoubleBkButton>
      </FocusCard>
    </ModeTab>
  </div>
</template>


<style scoped lang="scss">
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
</style>