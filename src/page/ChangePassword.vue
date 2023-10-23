<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue';
import FocusCard from '@/components/FocusCard.vue';
import BeautifulInput from '@/components/BeautifulInput.vue';
import axios from 'axios';
const user_name = inject<Ref<string>>('user_name')
const new_password = ref('')
const repeat_new_password = ref('')

const state = ref(0)

function ChangePassword() {
  if(new_password.value != repeat_new_password.value){
    alert("密码不一致")
    return
  }
  axios({
    method: 'put',
    url: 'employee/change',
    data: {
      username: user_name.value,
      password: new_password.value,
    },
  }).then((response) => {
    if(response.data.code == 1){
      state.value = 1
    }
  })
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