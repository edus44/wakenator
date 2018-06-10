<template>
  <BaseIcon
    :width="200"
    :height="200"
    :hover-interval="150"
    :render="renderMenu"
    class="close-icon"
  />
</template>

<script>
import BaseIcon from '@/components/ui/BaseIcon'

export default {
  components: { BaseIcon },
  methods: {
    renderMenu(rc, hovered) {
      const stroke = hovered ? '#df4418' : 'white'
      const s = 100
      const o = 50
      rc.line(o, o, s + o, s + o, { stroke, roughness: 2, strokeWidth: 3 })
      rc.line(s + o, o, o, s + o, { stroke, roughness: 2, strokeWidth: 3 })
    },
  },
}
</script>

<style lang="scss">
.close-icon {
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
