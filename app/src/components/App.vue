<template>
  <div>
    <Upgrade />
    <Tray />
    <Wake />
    <GlobalEvents @keyup.escape="minimize" />
  </div>
</template>

<script>
import Tray from '@/components/views/Tray'
import Wake from '@/components/views/Wake'
import Upgrade from '@/components/views/Upgrade'
import GlobalEvents from 'vue-global-events'
import { minimize } from '@/lib/win'

export default {
  components: { Tray, Wake, GlobalEvents, Upgrade },
  created() {
    this.$store.dispatch('user/init')
    this.$store.dispatch('root/checkLatestVersion')
  },
  methods: {
    minimize,
  },
}
</script>
