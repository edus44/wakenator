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
    interval: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        console.log('changed')
        this.refresh()
        clearTimeout(this.timer)
        if (this.interval) this.loop()
      },
    },
  },
  mounted() {
    this.rc = rough.canvas(this.$refs.canvas)
    this.render(this.rc)
    this.loop()
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    refresh() {
      this.rc.ctx.clearRect(0, 0, this.rc.canvas.width, this.rc.canvas.height)
      this.render(this.rc)
      this.loop()
    },
    loop() {
      if (this.interval) {
        this.timer = setTimeout(this.refresh, this.interval)
      }
    },
  },
}
</script>

<style lang="scss">
</style>