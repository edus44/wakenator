<template>
  <BaseIcon :width="60" :height="50" :hover-interval="150" :render="renderBack" class="back-icon" />
</template>

<script>
import BaseIcon from '@/components/ui/BaseIcon'

export default {
  components: { BaseIcon },
  methods: {
    renderBack(rc, hovered) {
      const stroke = hovered ? '#df4418' : 'white'
      rc.line(38, 15, 17, 25, { stroke })
      rc.line(17, 25, 38, 35, { stroke })
    },
  },
}
</script>

<style lang="scss">
.back-icon {
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
