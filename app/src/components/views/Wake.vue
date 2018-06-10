<template>
  <div v-if="waker" class="wake">
    <Rough
      :width="width"
      :height="height"
      :render="rc => rc.rectangle(0,0,width,height, { 
        stroke: 'transparent', 
        fill: '#1a1814',         
        fillWeight: 10,
        hachureGap: 40,
        hachureAngle: -5,
      })"
      class="layer"
    />
    <Rough
      :width="width"
      :height="height"
      :render="rc => rc.path(path, { 
        stroke: 'white', 
        strokeWidth:2
      })"
      class="layer"
    />
    <Close @click.native="hide"/>

    <Message :person="waker"/>
    <GlobalEvents
      @keyup.escape="hide"
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import Close from './Wake/Close'
import Message from './Wake/Message'
import GlobalEvents from 'vue-global-events'
import { maximize, minimize } from '@/lib/win'
import { mapGetters } from 'vuex'

export default {
  components: { Rough, Close, Message, GlobalEvents },
  data: () => ({
    width: 0,
    height: 0,
    waker: null,
  }),
  computed: {
    ...mapGetters('user', ['wakesRef']),
    path() {
      const o = 50
      const r = 200
      const w = this.width
      const h = this.height
      // return 'M 50 100 L 400 100 Q 400 200 500 200 L 500 400 L 50 400 L 50 100'
      return `M ${o} ${o} L ${w - o - r} ${o} Q ${w - o - r} ${o + r} ${w - o} ${o + r} L ${w -
        o} ${h - o} L ${o} ${h - o} L ${o} ${o} `
    },
  },

  watch: {
    wakesRef: {
      immediate: true,
      handler(ref, prevRef) {
        if (!ref) return
        if (prevRef) prevRef.off('child_added')
        ref.on('child_added', doc => {
          this.show(doc.val())
          // doc.ref.remove()
        })
      },
    },
  },
  created() {
    window.addEventListener('resize', this.updateSize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize)
  },
  methods: {
    updateSize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    show(waker) {
      this.waker = null
      this.$nextTick(() => {
        this.waker = waker
        this.updateSize()
        maximize()
      })
    },
    hide() {
      minimize()
      this.waker = null
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.wake {
  background: $black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  .layer {
    position: absolute;
  }
}
</style>