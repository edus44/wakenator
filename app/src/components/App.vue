<template>
  <div class="wrapper">
    <Rough
      :width="400"
      :height="400"
      :render="rc =>{
        rc.rectangle(5, 5, 390, 390, { stroke: 'white' })
      }"
      class="bg"
    />
    <Menu/>
    <div ref="content" class="content">
      <People/>
    </div>
  </div>
</template>

<script>
import People from '@/components/layout/People'
import Menu from '@/components/layout/Menu'
import Rough from '@/components/ui/Rough'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  components: { People, Rough, Menu },
  data: () => ({}),
  mounted() {
    const ps = new PerfectScrollbar(this.$refs.content, {})
    console.log(ps)
  },
}
</script>

<style lang="scss">
$w: 400px;
$h: 400px;
.wrapper {
  position: relative;
  > .bg {
    position: absolute;
    top: 5;
    left: 0;
    z-index: -1;
  }
  > .content {
    position: absolute;
    top: 14px;
    left: 14px;
    width: $w - 28;
    height: $h - 28;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>