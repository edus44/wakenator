<template>
  <div>
    <Menu @click.native="changeView('config')" />
    <People />
  </div>
</template>

<script>
import People from './Home/People'
import Menu from './Home/Menu'
import { mapMutations } from 'vuex'

export default {
  components: { People, Menu },
  methods: {
    ...mapMutations('root', ['changeView']),
  },
}
</script>
