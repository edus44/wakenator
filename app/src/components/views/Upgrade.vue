<template>
  <div v-if="showUpgrade" class="upgrade">
    <!-- <Rough
      :width="width"
      :height="height"
      :render="
        rc =>
          rc.rectangle(0, 0, width, height, {
            stroke: 'transparent',
            fill: '#1a1814',
            fillWeight: 10,
            hachureGap: 40,
            hachureAngle: -5,
          })
      "
      class="layer"
    /> -->
    New version available,
    <a @click="openURL('https://github.com/edus44/wakenator/releases/latest')">
      click here to download it
    </a>
  </div>
</template>

<script>
// import Rough from '@/components/ui/Rough'
import { openURL } from '@/lib/win'
import { mapState } from 'vuex'

export default {
  // components: { Rough },
  computed: {
    ...mapState('root', ['showUpgrade']),
  },
  methods: {
    openURL,
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.upgrade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 200;
  text-align: center;
  a {
    color: $red;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
