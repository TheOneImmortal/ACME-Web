<script setup lang="ts">
import { ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import FocusCard from '@/components/FocusCard.vue';
import BeautifulInput from '@/components/BeautifulInput.vue';
var mode = ref(0)
var pay_method = ref(0);
var commit = ref(0);

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
    <BeautifulInput v-if="pay_method == 1" prompt="邮寄地址" type="text" :value="mail_pos"
      @input_update="(arg0) => mail_pos = arg0" />
    <BeautifulInput v-if="pay_method == 2" prompt="汇款银行" type="text" :value="bank"
      @input_update="(arg0) => bank = arg0" />
    <BeautifulInput v-if="pay_method == 2" prompt="账号" type="text" :value="id" @input_update="(arg0) => id = arg0" />
    <br />
    <DoubleBkButton :is_active=false @clicked="commit = 1">提交</DoubleBkButton>
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