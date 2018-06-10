<template>
  <div>
    <Tray/>
    <Wake/>
  </div>
</template>

<script>
import Tray from '@/components/views/Tray'
import Wake from '@/components/views/Wake'

export default {
  components: { Tray, Wake },
  created() {
    this.$store.dispatch('user/init')
  },
}
</script>
