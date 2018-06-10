<template>
  <div class="tray">
    <Rough
      ref="bg"
      :width="400"
      :height="400"
      :render="rc => rc.rectangle(5, 5, 390, 390, { stroke: 'white' })"
      class="bg"
    />
    <div ref="content" class="content">
      <Home v-show="view=='home'"/>
      <Config v-if="view=='config'"/>
    </div>
  </div>
</template>

<script>
import Home from './Tray/Home'
import Config from './Tray/Config'
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
      setTimeout(() => this.ps.update())
    },
  },
  mounted() {
    this.ps = new PerfectScrollbar(this.$refs.content, {})
  },
}
</script>

<style lang="scss">
$w: 400px;
$h: 400px;
.tray {
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