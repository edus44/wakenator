<template>
  <div class="wrapper">
    <div class="bg">
      <wired-card>
        <div class="bg-space"/>
      </wired-card>
    </div>
    <div class="content">
      <People/>
    </div>
  </div>
</template>

<script>
import People from '@/components/layout/People'

export default {
  components: { People },
  data: () => ({}),
}
</script>

<style lang="scss">
$w: 400px;
$h: 400px;
.wrapper {
  > .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    .bg-space {
      width: $w - 20;
      height: $h - 20;
    }
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