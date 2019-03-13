<template>
  <div class="people">
    <div v-if="status" class="status">
      {{ status }}
    </div>
    <template v-else>
      <Search @click.native="startSearching()" />
      <transition-group name="list">
        <BaseInput
          v-if="searching"
          key="_search"
          ref="search"
          v-model="query"
          class="search"
          :prepend="''"
          :placeholder="'find someone'"
        />
        <div v-if="!filteredPeople.length" key="_status" class="status">No luck</div>
        <template v-for="(person, idx) in filteredPeople">
          <Person :key="person.uid" :person="person" />
          <Rough
            v-if="idx < filteredPeople.length - 1"
            :key="person.uid + 'line'"
            :width="200"
            :height="10"
            :render="rc => rc.line(10, 5, 190, 5, { stroke: 'white', roughness: 1 })"
            class="line"
          />
        </template>
      </transition-group>
    </template>
  </div>
</template>

<script>
import Person from './Person'
import Rough from '@/components/ui/Rough'
import BaseInput from '@/components/ui/BaseInput'
import Search from './Search'

import { mapGetters, mapState } from 'vuex'
import finder from '@/lib/finder'

export default {
  components: { Person, Rough, BaseInput, Search },
  data: () => ({
    users: null,
    searching: false,
    query: '',
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
    filteredPeople() {
      if (this.query) {
        return finder.find(this.query)
      } else {
        return this.people
      }
    },
    people() {
      const people =
        this.users &&
        Object.keys(this.users)
          .filter(uid => uid !== '.key' && uid !== this.uid && uid)
          .map(uid => ({
            uid,
            ...this.users[uid],
          }))
      finder.load(people)

      return people
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
  methods: {
    startSearching() {
      if (this.searching) {
        this.searching = false
        this.query = false
      } else {
        this.searching = true
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      }
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
  .status {
    font-size: 20px;
    color: #555;
    left: 0;
    top: 120px;
    width: 100%;
    position: absolute;
    text-align: center;
  }
}
</style>
