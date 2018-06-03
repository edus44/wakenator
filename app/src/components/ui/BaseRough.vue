<template>
  <canvas 
    ref="canvas"
    :width="width"
    :height="height"
  />
</template>

<script>
import rough from 'roughjs'

export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    render: {
      type: Function,
      required: true,
    },
  },
  mounted() {
    const rc = rough.canvas(this.$refs.canvas)
    this.render(rc)
  },
}
</script>

<style lang="scss">
</style>