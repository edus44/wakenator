<template>
  <div class="wrapper">
    <Rough
      :width="width"
      :height="height"
      :render="rc => rc.rectangle(0,0,width,height, { 
        stroke: 'transparent', 
        fill: '#1a1814',         
        fillWeight: 10,
        hachureGap: 40,
        hachureAngle: -10,
      })"
      class="fixed"
    />
    <Rough
      :width="width"
      :height="height"
      :render="rc => rc.path(path, { 
        stroke: 'white', 
        strokeWidth:2
      })"
      class="fixed"
    />
    <Close @hovered-change="v=>closeHovered=v" @click.native="close"/>

    <GlobalEvents
      @keyup.escape="close"
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import Close from '@/components/ui/Close'
import GlobalEvents from 'vue-global-events'

export default {
  components: { Rough, Close, GlobalEvents },
  data: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    closeHovered: false,
  }),
  computed: {
    path() {
      const o = 50
      const r = 200
      const w = this.width
      const h = this.height
      // return 'M 50 100 L 400 100 Q 400 200 500 200 L 500 400 L 50 400 L 50 100'
      return `M ${o} ${o} L ${w - o - r} ${o} Q ${w - o - r} ${o + r} ${w - o} ${o + r} L ${w -
        o} ${h - o} L ${o} ${h - o} L ${o} ${o} `
    },
  },
  methods: {
    close() {
      console.log('close')
    },
  },
}
</script>

<style lang="scss">
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
</style>