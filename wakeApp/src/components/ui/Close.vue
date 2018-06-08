<template>
  <div
    class="close"
    @mouseenter="hovered=true"
    @mouseleave="hovered=false"
  >
    <Rough
      :width="200"
      :height="200"
      :interval="hovered ? 150 : 0"
      :render="renderMenu"
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'

export default {
  components: { Rough },
  data: () => ({
    hovered: false,
  }),
  methods: {
    renderMenu(rc) {
      const stroke = this.hovered ? '#df4418' : 'white'
      const s = 100
      const o = 50
      rc.line(o, o, s + o, s + o, { stroke, roughness: 2, strokeWidth: 3 })
      rc.line(s + o, o, o, s + o, { stroke, roughness: 2, strokeWidth: 3 })
    },
  },
}
</script>

<style lang="scss">
.close {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 99;
  cursor: pointer;
  canvas {
    display: block;
  }
}
</style>
