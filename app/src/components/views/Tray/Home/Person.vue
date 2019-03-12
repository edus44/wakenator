<template>
  <div
    :class="{ hovered, waking }"
    class="person"
    @mouseover="!waking ? (hovered = true) : null"
    @mouseleave="hovered = false"
    @click="wake"
  >
    <div class="name">{{ person.name }}</div>
    <div class="host">{{ person.user }}@{{ person.host }}</div>

    <Rough
      v-if="hovered"
      :width="372"
      :height="50"
      :interval="200"
      :render="
        rc =>
          rc.rectangle(10, 2, 352, 46, {
            fill: '#df4418',
            fillWeight: 0.8,
            stroke: 'transparent',
            hachureGap: 6,
            roughness: 1.4,
          })
      "
      class="bg"
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import { mapActions } from 'vuex'

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
    waking: false,
  }),
  methods: {
    ...mapActions('user', ['wakePerson']),
    wake() {
      if (this.waking) return
      this.waking = true
      this.hovered = false
      this.wakePerson(this.person)
      setTimeout(() => (this.waking = false), 4000)
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.person {
  height: 50px;
  margin: 4px 0;
  position: relative;

  &.hovered {
    font-weight: bold;
    cursor: pointer;
  }

  &.waking {
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    animation-name: rubberBand;
  }

  .host,
  .name {
    line-height: 24px;
    position: absolute;
    width: 100%;
  }
  .name {
    top: 0;
    font-size: 20px;
  }
  .host {
    bottom: 0;
    font-size: 14px;
    color: #aaa;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}

@keyframes rubberBand {
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
</style>
