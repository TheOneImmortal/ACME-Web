<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Ref, inject, ref, watch } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue';
import html2pdf from 'html2pdf.js';
import ModeTab from '../components/ModeTab.vue';
import FocusCard from '../components/FocusCard.vue';
import { message } from 'ant-design-vue';
import BeautifulInput from '../components/BeautifulInput.vue';


const main_color = inject<Ref<string>>('main_color')
const grey_color = inject<Ref<string>>('grey_color')
const dark_grey_color = inject<Ref<string>>('dark_grey_color')
const bk_color = inject<Ref<string>>('bk_color')


const tabs = ref([{
  mode: 1,
  name: '总工作时长'
}, {
  mode: 2,
  name: '年初至今薪资'
}])
const mode = ref(0)
const date = ref<Date[]>()

const pdf_state = ref(false)

const employee_id = ref('')

function generatePDF() {
  if (pdf_state.value == false) {
    message.error('暂无可用的报告');
    return
  }
  console.log(1)
  const content = document.getElementById('pdf-content') // 获取要转换为PDF的DOM元素

  const pdfOptions = {

    margin: 10,
    filename: 'generated-pdf.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  }

  // html2pdf().from(content).set(pdfOptions).save('D:\\my_report.pdf')

  const filename = `my_report.pdf`
  const blob = new Blob([html2pdf().from(content).set(pdfOptions)], { type: "application/octet-stream" })
  const nav = (window.navigator as any)
  console.log(nav)
  if (nav.msSaveBlob) {
    // 支持Microsoft Edge和Internet Explorer浏览器
    console.log("im edge")
    nav.msSaveBlob(blob, filename);
  } else if (typeof URL === 'function' && typeof HTMLCanvasElement.prototype.toBlob === 'function') {
    // 支持Chrome、Firefox和Safari浏览器
    console.log("im not")
    var link = document.createElement('a')
    link.download = filename
    link.href = URL.createObjectURL(blob)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
  }
}


function getReport() {
  let app = document.getElementById('pdf-content');
  app.innerText = "这里将会出现一个报告"
  pdf_state.value = true;
}
// function onClick (value: any) {
//   if (value !== 1) {
//     // 设置DatePicker的开始时间和结束时间
//     date1.value = new Date(2023, 0, 1); // 2023年1月1日
//     date2.value = new Date(); // 当天日期
//   }
//   if (value===1) {
//     // 用户选择薪资报告
//     isDatePickerDisabled.value = true; // 禁用DatePicker
//     // 还可以设置DatePicker的值为2023年1月1日和当天，类似之前的逻辑
//   } else {
//     // 用户选择工作时长报告
//     isDatePickerDisabled.value = false; // 启用DatePicker
//   }
// }

watch(mode, (v) => {
  console.log(v)
  let app = document.getElementById('pdf-content');
  if (pdf_state.value == true)
    app.innerText = ""
  pdf_state.value = false;
  switch (Math.floor(v)) {
    case 0:
      break;
    case 1:
      break;
    case 2:
      date.value = [new Date(), new Date()];
      date.value[0].setMonth(0);
      date.value[0].setDate(1);
      break;
  }
})


</script>


<template>
  <ModeTab :modes="tabs" @mode_update="(arg0) => mode = arg0">
    <FocusCard v-if="mode != 0">
      <div class="row">
        <VueDatePicker class="picker" v-model="date" v-if="mode == 2" :disabled="mode == 2" inline auto-apply
          :enable-time-picker="false" range partial-range six-weeks :start-date="date[0]" :focus-start-date="true">
        </VueDatePicker>
        <VueDatePicker class="picker" v-model="date" :disabled="mode == 2" inline auto-apply :enable-time-picker="false"
          range partial-range six-weeks></VueDatePicker>
      </div>
      <BeautifulInput :value="employee_id" @input="(arg0) => employee_id = arg0" prompt="欲查询员工ID" />
      <br>
      <DoubleBkButton :is_active="false" @click="getReport">生成报告</DoubleBkButton>
      <div v-show="pdf_state" id="pdf-content">
        <h1>生成PDF示例</h1>
        <p>这是一个可以保存为PDF的DOM元素示例。</p>
      </div>
      <DoubleBkButton v-show="pdf_state" :is_active="false" @click="generatePDF">保存报告</DoubleBkButton>
    </FocusCard>
  </ModeTab>
</template>




<style scoped lang="scss">
.row {
  display: flex;
  justify-content: center;
}

.choose {
  position: relative;
  width: 100%;
  display: inline-block;
  align-items: center;
  text-align: center;

}

.queding {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
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