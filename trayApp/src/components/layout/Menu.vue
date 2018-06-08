<template>
  <div
    class="menu"
    @mouseenter="hovered=true"
    @mouseleave="hovered=false"
  >
    <Rough
      :width="60"
      :height="50"
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
      rc.line(17, 24, 42, 24, { stroke })
      rc.line(17, 17, 42, 17, { stroke })
      rc.line(17, 31, 42, 31, { stroke })
    },
  },
}
</script>

<style lang="scss">
.menu {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 99;
  cursor: pointer;
  canvas {
    display: block;
  }
}
</style>
