<template>
  <div class="people">
    <div v-if="status" class="status">
      {{ status }}
    </div>
    <template v-else>
      <Search :query.sync="query" :selected.sync="selected" :is-key.sync="isKey" />
      <transition-group name="list">
        <div v-if="!filteredPeople.length" key="_status" class="status">No luck</div>
        <template v-for="(person, idx) in filteredPeople">
          <Person
            :ref="'person' + idx"
            :key="person.uid"
            :person="person"
            :selected="selected === idx"
            @update="value => moveTo(value ? idx : -1)"
          />
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
    <GlobalEvents @keydown.down="moveDir(1)" />
    <GlobalEvents @keydown.up="moveDir(-1)" />
    <GlobalEvents @keydown.enter="select" />
  </div>
</template>

<script>
import Person from './Person'
import Rough from '@/components/ui/Rough'
import Search from './Search'

import { mapGetters, mapState } from 'vuex'
import finder from '@/lib/finder'
import scrollChild from '@/lib/scrollChildDirective'
import GlobalEvents from 'vue-global-events'

export default {
  components: { Person, Rough, Search, GlobalEvents },
  data: () => ({
    users: null,
    query: '',
    isKey: false,
    selected: -1,
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
    filteredPeople() {
      this.$root.$emit('refresh-scrollbar')
    },
    query() {
      this.selected = 0
      this.isKey = true
      this.updateScroll()
    },
    selected() {
      this.updateScroll()
    },
  },
  methods: {
    moveDir(dir) {
      this.isKey = true
      this.selected = Math.min(Math.max(this.selected + dir, 0), this.filteredPeople.length - 1)
    },
    moveTo(index) {
      this.isKey = false
      this.selected = index
    },
    select() {
      this.$refs['person' + this.selected][0].wake()
      this.selected = -1
    },
    updateScroll() {
      if (this.isKey) setTimeout(() => scrollChild(this.selected))
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
