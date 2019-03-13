<template>
  <BaseIcon
    :width="60"
    :height="50"
    :hover-interval="150"
    :render="renderSearch"
    class="search-icon"
  />
</template>

<script>
import BaseIcon from '@/components/ui/BaseIcon'

export default {
  components: { BaseIcon },
  methods: {
    renderSearch(rc, hovered) {
      const stroke = hovered ? '#df4418' : 'white'
      rc.circle(23, 21, 15, { stroke })
      rc.line(29, 26, 39, 36, { stroke })
    },
  },
}
</script>

<style lang="scss">
.search-icon {
  position: fixed;
  top: 60px;
  left: 10px;
  z-index: 99;
  cursor: pointer;
  canvas {
    display: block;
  }
}
</style>
