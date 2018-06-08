<template>
  <div>
    <Menu @click.native="changeView('config')"/>
    <People/>
  </div>
</template>

<script>
import People from '@/components/layout/People'
import Menu from '@/components/layout/Menu'
import { mapMutations } from 'vuex'

export default {
  components: { People, Menu },
  methods: {
    ...mapMutations('root', ['changeView']),
  },
}
</script>

<style lang="scss">
</style>