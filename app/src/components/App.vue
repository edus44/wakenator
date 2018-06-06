<template>
  <div class="wrapper">
    <Rough
      ref="bg"
      :width="400"
      :height="400"
      :render="rc => rc.rectangle(5, 5, 390, 390, { stroke: 'white' })"
      class="bg"
    />
    <div ref="content" class="content">
      <Home v-if="view=='home'"/>
      <Config v-if="view=='config'"/>
    </div>
  </div>
</template>

<script>
import Home from '@/components/views/Home'
import Config from '@/components/views/Config'
import Rough from '@/components/ui/Rough'
import PerfectScrollbar from 'perfect-scrollbar'
import { mapState } from 'vuex'

export default {
  components: { Home, Config, Rough },
  computed: {
    ...mapState('root', ['view']),
  },
  watch: {
    view() {
      this.$refs.bg.refresh()
    },
  },
  mounted() {
    /* eslint-disable no-new */
    new PerfectScrollbar(this.$refs.content, {})
  },
}
</script>

<style lang="scss">
$w: 400px;
$h: 400px;
.wrapper {
  position: relative;
  > .bg {
    position: absolute;
    top: 5;
    left: 0;
    z-index: -1;
  }
  > .content {
    position: absolute;
    top: 14px;
    left: 14px;
    width: $w - 28;
    height: $h - 28;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>