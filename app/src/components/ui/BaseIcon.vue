<template>
  <div @mouseenter="hovered = true" @mouseleave="hovered = false">
    <Rough ref="rough" v-bind="$attrs" :interval="hovered ? 150 : 0" :render="proxyRender" />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'

export default {
  components: { Rough },
  props: {
    hoverInterval: {
      type: Number,
      default: 0,
    },
    render: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    hovered: false,
  }),
  methods: {
    proxyRender(rc) {
      return this.render(rc, this.hovered)
    },
    refresh() {
      this.$refs.rough.refresh()
    },
  },
}
</script>
