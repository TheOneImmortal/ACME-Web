<script setup lang="ts">
import { Ref, inject, ref, watch } from 'vue';
import DoubleBkButton from '../components/DoubleBkButton.vue';
import FocusCard from '@/components/FocusCard.vue';
import BeautifulInput from '@/components/BeautifulInput.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import Dropdown from 'v-dropdown'
import axios from 'axios';


const main_color = inject<Ref<string>>('main_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')
const bk_color = inject<Ref<string>>('bk_color')
const user_name = inject<Ref<string>>('user_name')
var save = ref(0)
var commit = ref(0)
const date = ref([new Date(), new Date()])
const pro_time = ref('')
const selectedProject = ref(0)
const projects = ref([        //todo: 从后端get项目列表
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' },
  { id: 3, name: '项目3' },
  // 添加更多项目...
])

function submit(){
  axios({
    method: 'get',
    url: 'attendance/add',
    params: {
      username: user_name.value,
      working_hour: pro_time.value,
    },
  }).then(
    (response) => {
      if(response.data.code == 1){
        alert("上传成功")
      } else {
        alert("今日工时已保存")
      }
    }
    
  )
}

</script>

<template>
  <FocusCard>
    <div class="row">
      <VueDatePicker class="picker" v-model="date" :disabled=true inline auto-apply :enable-time-picker="false" range
        partial-range six-weeks :start-date="date[0]" :focus-start-date="true"></VueDatePicker>
      <VueDatePicker class="picker" v-model="date" :disabled=true inline auto-apply :enable-time-picker="false" range
        partial-range six-weeks></VueDatePicker>
    </div>
    <label>今日工作时间为</label>
    <BeautifulInput prompt="工作时间" type="number" :value="pro_time" @input_update="(arg0) => pro_time = arg0" :min="0"
      step="0.5" />
    <br />
    <DoubleBkButton :is_active=false @clicked=submit>提交</DoubleBkButton>
  </FocusCard>
</template>


<style scoped lang="scss">
.row {
  display: flex;
  justify-content: center;
}

.picker {
  --dp-border-radius: 8px;
  --dp-cell-border-radius: 50%;
  --dp-common-transition: all 1s $ease-better; // TODO: ?

  --dp-button-height: 32px;
  --dp-month-year-row-height: 32px;
  --dp-month-year-row-button-size: 32px;
  --dp-button-icon-height: 20px;
  --dp-cell-size: 32px;
  --dp-cell-padding: 0px;
  --dp-common-padding: 10px; // TODO: ?
  --dp-input-icon-padding: 42px;
  --dp-input-padding: 0px 30px 1px 0px;
  --dp-menu-min-width: 260px;
  --dp-action-buttons-padding: 14px 8px;
  --dp-row-margin: 8px 0px;
  --dp-calendar-header-cell-padding: 100px; // TODO: ?
  --dp-two-calendars-spacing: 10px; // TODO: ?
  --dp-overlay-col-padding: 8px;
  --dp-time-inc-dec-button-size: 36px;
  --dp-menu-padding: 18px 18px;

  --dp-font-size: 16px;
  --dp-preview-font-size: 18px;
  --dp-time-font-size: 20px;

  --dp-animation-duration: 0.2s;
  --dp-menu-appear-transition-timing: $ease-better;
  --dp-transition-timing: $ease-better; // TODO: ?

  --dp-background-color: #fff;
  --dp-text-color: black;
  --dp-border-color: v-bind(dark_grey_color);
  --dp-border-color-hover: v-bind(main_color);
  --dp-disabled-color: v-bind(grey_color);
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: v-bind(main_color);
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
}

.bi-wrapper {
  width: 400px;
}
</style>