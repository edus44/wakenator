<template>
  <div>

    <Tray v-show="section=='tray'"/>
    <Wake v-show="section=='wake'"/>

    <GlobalEvents
      @keyup.t="toggle"
    />
  </div>
</template>

<script>
import Tray from '@/components/views/Tray'
import Wake from '@/components/views/Wake'
import GlobalEvents from 'vue-global-events'

export default {
  components: { Tray, Wake, GlobalEvents },
  data: () => ({
    section: 'tray',
  }),
  created() {
    this.$store.dispatch('user/init')
  },
  methods: {
    toggle() {
      this.section = this.section === 'tray' ? 'wake' : 'tray'
    },
  },
}
</script>

<style lang="scss">
</style>