<template>
  <div 
    :class="{hovered}" 
    class="person" 
    @mouseover="hovered=true"
    @mouseleave="hovered=false"
  >
    <div class="name">{{ person.name }}</div>
    <div class="host">{{ person.user }}@{{ person.host }}</div>

    <Rough
      v-if="hovered"
      :width="372"
      :height="50"
      :interval="200"
      :render="renderBg"
      class="bg"
    />

  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'

export default {
  components: { Rough },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    hovered: false,
  }),
  methods: {
    renderBg(rc) {
      rc.rectangle(10, 2, 352, 46, {
        fill: '#df4418',
        fillWeight: 0.8,
        stroke: 'transparent',
        hachureGap: 6,
        roughness: 1.4,
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.person {
  height: 50px;
  margin: 4px 0;
  cursor: pointer;
  position: relative;

  &.hovered {
    font-weight: bold;
    // span {
    //   font-weight: bold;
    //   display: inline-block;
    //   animation-duration: 0.3s;
    //   animation-fill-mode: both;
    //   animation-iteration-count: infinite;
    //   animation-name: pulse;
    // }
  }
  .name {
    font-size: 20px;
    line-height: 24px;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .host {
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #aaa;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}

@keyframes pulse {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.03, 1.03, 1.03);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>