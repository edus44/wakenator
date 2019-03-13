<template>
  <BaseIcon
    ref="icon"
    :width="60"
    :height="50"
    :hover-interval="150"
    :render="renderSearch"
    class="search-icon"
    :class="{ alt }"
  />
</template>

<script>
import BaseIcon from '@/components/ui/BaseIcon'

export default {
  components: { BaseIcon },
  props: {
    alt: { type: Boolean, required: true },
  },
  watch: {
    alt() {
      this.$refs.icon.refresh()
    },
  },
  methods: {
    renderSearch(rc, hovered) {
      if (this.alt) {
        const stroke = hovered ? '#1d1b17' : 'white'
        rc.line(10, 10, 35, 35, { stroke })
        rc.line(35, 10, 10, 35, { stroke })
      } else {
        const stroke = hovered ? '#df4418' : 'white'
        rc.circle(23, 21, 15, { stroke })
        rc.line(29, 26, 39, 36, { stroke })
      }
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
  transition: 0.3s;
  &.alt {
    top: 38px;
    left: 282px;
  }
}
</style>
