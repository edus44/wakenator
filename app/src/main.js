import Vue from 'vue'

import App from './components/App.vue'
import store from './store'
import client from './lib/client'

client.setStore(store)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
