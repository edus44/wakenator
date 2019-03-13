<template>
  <div>
    <Tray />
    <Wake />

    <GlobalEvents @keyup.escape="minimize" />
  </div>
</template>

<script>
import Tray from '@/components/views/Tray'
import Wake from '@/components/views/Wake'
import GlobalEvents from 'vue-global-events'
import { minimize } from '@/lib/win'

const ipcRenderer = window.require && window.require('electron').ipcRenderer

export default {
  components: { Tray, Wake, GlobalEvents },
  created() {
    this.$store.dispatch('user/init')
    ipcRenderer && ipcRenderer.on('latest-version', this.saveLatestVersion)
  },
  beforeDestroy() {
    ipcRenderer && ipcRenderer.off('latest-version', this.saveLatestVersion)
  },
  methods: {
    minimize,
    saveLatestVersion(e, latestVersion) {
      // console.log(process.env.VUE_APP_DESKTOP_VERSION, latestVersion)
    },
  },
}
</script>
