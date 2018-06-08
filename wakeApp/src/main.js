import '@/assets/style/main.scss'

import Vue from 'vue'

import App from '@/components/App.vue'

const vm = new Vue({
  el: '#app',
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') window.vm = vm
Vue.config.productionTip = false
