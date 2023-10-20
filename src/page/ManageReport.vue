<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { Ref, inject, ref, watch } from 'vue'
import DoubleBkButton from '../components/DoubleBkButton.vue';
import html2pdf from 'html2pdf.js';

var mode1 = ref(0);
const value = ref(1)
const date1 = ref(new Date(2023, 0, 1));
const date2 = ref(new Date());
const message = ref('');
const isDatePickerDisabled = ref(false); // 初始状态下DatePicker可编辑

const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function generatePDF() {
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

watch(value, (new_value, old_value) => {
  console.log(new_value)
  switch (Math.floor(new_value)) {
    case 0:
      console.log(0)
      isDatePickerDisabled.value = false;
      break;
    case 1:
      console.log(1)
      date1.value = new Date(2023, 0, 1); // 2023年1月1日
      date2.value = new Date();
      isDatePickerDisabled.value = true;
      break;
  }
})


</script>


<template>
  <div class="page-wrapper">


    <div class="mode-tab-wrapper">
      <DoubleBkButton :is_active="mode1 == 1" @clicked="mode1 = 1">创建管理报告</DoubleBkButton>
      <DoubleBkButton :is_active="mode1 == 2" @clicked="mode1 = 2">创建员工报告</DoubleBkButton>
    </div>

    <div class="right">
      <div class="choose">

        <!-- 单选框 -->
        <input type="radio" value="0" v-model="value" />总工作时长报告
        <input type="radio" value="1" v-model="value" />年初至今薪资报告

      </div>


      <VueDatePicker class="picker" v-model="date1" :format="format" :disabled="isDatePickerDisabled"></VueDatePicker>
      选择起始时间
      <br>
      <VueDatePicker class="picker" v-model="date2" :format="format" :disabled="isDatePickerDisabled"></VueDatePicker>
      选择结束时间

      <p>Employee Name: {{ message }}</p>
      <input v-model="message" placeholder="please input employee name" />

      <button class="queding" @click="generatePDF">生成报告</button>
      <div id="pdf-content">
        <h1>生成PDF示例</h1>
        <p>这是一个可以保存为PDF的DOM元素示例。</p><!-- 这里添加你想要转换为PDF的内容 -->
      </div>
    </div>

  </div>
</template>




<style scoped lang="scss">
.page-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  .mode-tab-wrapper {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .dbb-wrapper {
      height: 100px;
      margin: 0;

      &:hover {
        height: 110px;
      }
    }

  }

  .right {
    flex-direction: column;

    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 200px;
    margin: 100px;

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
      position: relative;
      /*General*/
      --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
      --dp-border-radius: 4px;
      /*Configurable border-radius*/
      --dp-cell-border-radius: 4px;
      /*Specific border radius for the calendar cell*/
      --dp-common-transition: all 0.1s ease-in;
      /*Generic transition applied on buttons and calendar cells*/

      /*Sizing*/
      --dp-button-height: 35px;
      /*Size for buttons in overlays*/
      --dp-month-year-row-height: 35px;
      /*Height of the month-year select row*/
      --dp-month-year-row-button-size: 35px;
      /*Specific height for the next/previous buttons*/
      --dp-button-icon-height: 20px;
      /*Icon sizing in buttons*/
      --dp-cell-size: 35px;
      /*Width and height of calendar cell*/
      --dp-cell-padding: 5px;
      /*Padding in the cell*/
      --dp-common-padding: 10px;
      /*Common padding used*/
      --dp-input-icon-padding: 35px;
      /*Padding on the left side of the input if icon is present*/
      --dp-input-padding: 6px 30px 6px 12px;
      /*Padding in the input*/
      --dp-menu-min-width: 260px;
      /*Adjust the min width of the menu*/
      --dp-action-buttons-padding: 2px 5px;
      /*Adjust padding for the action buttons in action row*/
      --dp-row-margin: 5px 0;
      /*Adjust the spacing between rows in the calendar*/
      --dp-calendar-header-cell-padding: 0.5rem;
      /*Adjust padding in calendar header cells*/
      --dp-two-calendars-spacing: 10px;
      /*Space between multiple calendars*/
      --dp-overlay-col-padding: 3px;
      /*Padding in the overlay column*/
      --dp-time-inc-dec-button-size: 32px;
      /*Sizing for arrow buttons in the time picker*/
      --dp-menu-padding: 6px 8px;
      /*Menu padding*/

      /*Font sizes*/
      --dp-font-size: 0.3rem;
      /*Default font-size*/
      --dp-preview-font-size: 0.2rem;
      /*Font size of the date preview in the action row*/
      --dp-time-font-size: 0.2rem;
      /*Font size in the time picker*/

      /*Transitions*/
      --dp-animation-duration: 0.1s;
      /*Transition duration*/
      --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);
      /*Timing on menu appear animation*/
      --dp-transition-timing: ease-out;
      /*Timing on slide animations*/

      .dp-calendar {
        background-color: #fff;
        border-radius: var(--dp-border-radius);
        border: 1px solid #ccc;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
    }

  }
}
</style>