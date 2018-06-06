<template>
  <div>
    <Back @click.native="changeView('home')"/>

  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import Back from '@/components/layout/Back'
import { mapMutations } from 'vuex'

export default {
  components: { Rough, Back },
  methods: {
    ...mapMutations('root', ['changeView']),
  },
}
</script>

<style lang="scss">
</style>