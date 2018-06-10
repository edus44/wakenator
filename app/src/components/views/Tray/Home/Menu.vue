<template>
  <BaseIcon
    :width="60"
    :height="50"
    :hover-interval="150"
    :render="renderMenu"
    class="menu-icon"
  />
</template>

<script>
import BaseIcon from '@/components/ui/BaseIcon'

export default {
  components: { BaseIcon },
  methods: {
    renderMenu(rc, hovered) {
      const stroke = hovered ? '#df4418' : 'white'
      rc.line(17, 24, 42, 24, { stroke })
      rc.line(17, 17, 42, 17, { stroke })
      rc.line(17, 31, 42, 31, { stroke })
    },
  },
}
</script>

<style lang="scss">
.menu-icon {
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
