import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

interface Navigator {
  msSaveOrOpenBlob?: (blob: any, defaultName?: string) => boolean
}

createApp(App).mount('#app')
