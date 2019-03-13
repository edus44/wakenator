<template>
  <div class="people">
    <div v-if="status" class="status">
      {{ status }}
    </div>
    <template v-for="(person, idx) in people" v-else>
      <Person :key="person.uid" :person="person" />
      <Rough
        v-if="idx < people.length - 1"
        :key="person.uid + 'line'"
        :width="200"
        :height="10"
        :render="rc => rc.line(10, 5, 190, 5, { stroke: 'white', roughness: 1 })"
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
    ...mapState('user', ['uid', 'channel', 'connected']),
    ...mapGetters('user', ['channelRef']),
    status() {
      if (!this.connected) return 'Connecting...'
      if (!this.people) return 'Entering...'
      if (this.people && !this.people.length) return `Nobody at ${this.channel} channel`
      return ''
    },
    people() {
      return (
        this.users &&
        Object.keys(this.users)
          .filter(uid => uid !== '.key' && uid !== this.uid && uid)
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
        if (this.$firebaseRefs && this.$firebaseRefs.users) {
          this.$unbind('users')
        }
        if (!ref) return
        this.$bindAsObject('users', ref)
      },
    },
    users() {
      this.$root.$emit('refresh-scrollbar')
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
  > .status {
    font-size: 20px;
    color: #555;
    margin-top: 100px;
  }
}
</style>
