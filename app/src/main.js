import '@/assets/style/main.scss'

import Vue from 'vue'
import Vuetify from 'vuetify'

import store from '@/store'

import App from '@/components/App.vue'

Vue.use(Vuetify)

const vm = new Vue({
  el: '#app',
  store,
  render: h => h(App),
})

if (process.env.NODE_ENV === 'development') window.vm = vm
Vue.config.productionTip = false
