<template>
  <div v-if="showUpgrade" class="upgrade">
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
  bottom: 0px;
  left: 50%;
  margin-left: -180px;
  z-index: 200;
  text-align: center;
  background-color: $red;
  border-radius: 10px 10px 0 0;
  padding: 2px 0;
  width: 360px;
  color: $black;
  a {
    color: white;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
