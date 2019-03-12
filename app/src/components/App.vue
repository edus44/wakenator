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

export default {
  components: { Tray, Wake, GlobalEvents },
  created() {
    this.$store.dispatch('user/init')
  },
  methods: {
    minimize,
  },
}
</script>
