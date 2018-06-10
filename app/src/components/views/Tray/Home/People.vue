<template>
  <div class="people">
    <template v-for="(person,idx) in people" >
      <Person :person="person" :key="person.uid" />
      <Rough
        v-if="idx < people.length-1"
        :key="person.name+'line'"
        :width="200"
        :height="10"
        :render="rc=>rc.line(10, 5, 190, 5, { stroke: 'white', roughness: 1 })"
        class="line"
      />
    </template>
  </div>
</template>

<script>
import Person from './Person'
import Rough from '@/components/ui/Rough'
import { mapGetters, mapState } from 'vuex'
export default {
  components: { Person, Rough },
  data: () => ({
    users: null,
  }),
  computed: {
    ...mapState('user', ['uid']),
    ...mapGetters('user', ['channelRef']),
    people() {
      return (
        this.users &&
        Object.keys(this.users)
          .filter(uid => uid !== '.key' && uid !== this.uid)
          .map(uid => ({
            uid,
            ...this.users[uid],
          }))
      )
    },
  },
  watch: {
    channelRef: {
      immediate: true,
      handler(ref) {
        if (!ref) return

        if (this.$firebaseRefs && this.$firebaseRefs.users) {
          this.$unbind('users')
        }
        this.$bindAsObject('users', ref)
      },
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.people {
  text-align: center;
  > .line {
    display: block;
    margin: 0 auto;
  }
}
</style>