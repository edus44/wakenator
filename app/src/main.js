import '@/assets/style/main.scss'
import Vue from 'vue'
import vuefire from 'vuefire'

import store from '@/store'

import App from '@/components/App.vue'

if (process.env.NODE_ENV === 'development') require('debug').enable('wk*')

Vue.use(vuefire)

const vm = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') window.vm = vm
Vue.config.productionTip = false
