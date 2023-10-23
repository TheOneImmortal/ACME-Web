<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Ref, inject, ref, watch } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue';
import Dropdown from 'v-dropdown'
import ModeTab from '../components/ModeTab.vue';
import FocusCard from '../components/FocusCard.vue';
import html2pdf from 'html2pdf.js'
import { message } from 'ant-design-vue';


const main_color = inject<Ref<string>>('main_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')
const bk_color = inject<Ref<string>>('bk_color')
const user_name = inject<Ref<string>>('user_name')
import axios from 'axios';
function request_report_employee(){
  return axios({
    method: 'get',
    url: 'report/type',
    params: {
      type: mode.value = mode.value,
      username: user_name.value,
      start_date: date.value[0],
      end_date: date.value[1],
      project_id: selectedProject.value
    }
  })
}

const tabs = ref([{
  mode: 1,
  name: '总工作时长'
}, {
  mode: 2,
  name: '项目工作时长'
}, {
  mode: 3,
  name: '假期/病假'
}, {
  mode: 4,
  name: '年初至今工资'
}])
const date = ref([new Date(), new Date()])
var mode = ref(0);

const pdf_state = ref(false)

function generatePDF() {
  if (pdf_state.value == false) {
    message.error('暂无可用的报告');
    return
  }
  console.log(1)
  const content = document.getElementById('pdf-content'); // 获取要转换为PDF的DOM元素

  const pdfOptions = {
    margin: 10,
    filename: 'generated-pdf.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().from(content).set(pdfOptions).save('my_report.pdf');
}
function getReport() {
    request_report_employee().then(
      (response) => {
          if (response.data.code == 1){
            console.log(response.data);
            let app = document.getElementById('pdf-content');
            app.innerText = response.data.data;
          pdf_state.value = true;
        }
      }
    )
}
const format = (date) => {
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();

  // return `${year}/${month}/${day}`;
}

watch(mode, (val) => {
  let app = document.getElementById('pdf-content');
  if (pdf_state.value == true)
    app.innerText = ""
  pdf_state.value = false;
  if(mode.value == 2){
    get_project().then(
      (response) => {
        if (response.data.code == 1){
          console.log(response.data.data)
          projects.value = response.data.data
        }
      }
    )
  }

  if (mode.value == 4) {
    var new_date = [new Date(), new Date()]
    new_date[0].setMonth(0, 1)
    date.value = new_date
  }
})

const selectedProject = ref(0);

function get_project(){
  return axios({
    method: 'get',
    url: 'report/allproject',
    params:{
      username: user_name.value
    }
  })
}

const projects = ref([        //todo: 从后端get项目列表
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' },
  { id: 3, name: '项目3' },
  // 添加更多项目...
]);
</script>


<template>
  <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0">
    <FocusCard v-if="mode != 0">
      <label v-if="mode == 2">请选择项目</label>
      <Dropdown v-if="mode == 2">
        <template #trigger>
          <div>
            <select v-model="selectedProject">
              <option disabled :value="0">请选择项目</option>
              <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.id }}-{{ project.name
              }}
              </option>
            </select>
          </div>
        </template>
      </Dropdown>
      <br>
      <label v-if="mode != 4">请选择范围</label>
      <div>
        <VueDatePicker class="picker" :disabled="mode == 4" inline auto-apply :enable-time-picker="false" v-model="date"
          range partial-range six-weeks>
        </VueDatePicker>
      </div>
      <br>
      <DoubleBkButton :is_active="false" @click="getReport">生成报告</DoubleBkButton>
      <div v-show="pdf_state" id="pdf-content">
        <h1>生成PDF示例</h1>
        <p>这是一个可以保存为PDF的DOM元素示例。</p><!-- 这里添加你想要转换为PDF的内容 -->
      </div>
      <DoubleBkButton v-if="pdf_state" :is_active="false" @click="generatePDF">保存报告</DoubleBkButton>
    </FocusCard>
  </ModeTab>
</template>



<style scoped lang="scss">
.choose {
  margin-top: 20px;

  .radio-group {
    display: flex;
    flex-direction: column;
  }

  .radio-group input[type="radio"] {
    margin-right: 10px;
    cursor: pointer;
  }

  .radio-group label {
    font-weight: bold;
  }

  .dropdown-trigger button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .dropdown-trigger button:hover {
    background-color: #0056b3;
  }
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
</style>