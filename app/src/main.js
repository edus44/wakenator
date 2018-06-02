import '@/assets/style/main.scss'

import Vue from 'vue'

import store from '@/store'

import App from '@/components/App.vue'

// eslint-disable-next-line
import { WiredButton, WiredInput } from 'wired-elements'

const vm = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') window.vm = vm
Vue.config.productionTip = false
Vue.config.ignoredElements = [/^wired-/]
