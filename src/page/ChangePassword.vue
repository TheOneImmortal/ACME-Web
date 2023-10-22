<script setup lang="ts">
import { ref } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import FocusCard from '@/components/FocusCard.vue';
import BeautifulInput from '@/components/BeautifulInput.vue';


const new_password = ref('')
const repeat_new_password = ref('')

const state = ref(0)

function ChangePassword() {
  state.value = 1
}
</script>

<template>
  <FocusCard>
    <div v-if="state == 0">
      <BeautifulInput prompt="新密码" type="text" :value="new_password" @input_update="(arg0) => new_password = arg0" />
      <BeautifulInput prompt="重复输入新密码" type="text" :value="repeat_new_password"
        @input_update="(arg0) => repeat_new_password = arg0" />
      <br />
      <DoubleBkButton :is_active=false @clicked="ChangePassword">修改</DoubleBkButton>
    </div>
    <div v-else>
      <label>修改成功</label>
    </div>
  </FocusCard>
</template>


<style scoped lang="scss">
.bi-wrapper {
  width: 400px;
}
</style>