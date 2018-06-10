<template>
  <div>

    <Tray/>
    <Wake/>
  </div>
</template>

<script>
import Tray from '@/components/views/Tray'
import Wake from '@/components/views/Wake'
import GlobalEvents from 'vue-global-events'

export default {
  components: { Tray, Wake, GlobalEvents },
  created() {
    this.$store.dispatch('user/init')
  },
}
</script>

<style lang="scss">
</style>