<template>
  <div>
    <SearchIcon :alt="searching" @click.native="toggleSearching" />
    <transition name="fade" appear>
      <div v-if="searching">
        <div class="search__box">
          <BaseInput
            ref="search"
            :value="query"
            light
            small
            :placeholder="'find someone'"
            @input="v => $emit('update:query', v)"
          />
        </div>
        <div class="search__spacer" />
      </div>
    </transition>

    <GlobalEvents @keyup.escape="stopSearching" />
    <GlobalEvents @keydown.ctrl.f="toggleSearching" />
    <GlobalEvents @keydown.meta.f="toggleSearching" />
  </div>
</template>

<script>
import BaseInput from '@/components/ui/BaseInput'
import SearchIcon from './SearchIcon'

import GlobalEvents from 'vue-global-events'

export default {
  components: { BaseInput, SearchIcon, GlobalEvents },
  props: {
    query: { type: String, required: true },
    selected: { type: Number, required: true },
    isKey: { type: Boolean, required: true },
  },
  data: () => ({
    searching: false,
  }),
  watch: {
    searching(v) {
      this.$store.commit('root/setSearching', v)
    },
  },
  methods: {
    toggleSearching(e) {
      if (this.searching) {
        this.stopSearching(e)
      } else {
        this.startSearching(e)
      }
    },
    startSearching(e) {
      this.searching = true
      this.$emit('update:isKey', true)
      this.$emit('update:selected', 0)
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
      setTimeout(() => {
        this.$emit('update:selected', -1)
      }, 10)
    },
    stopSearching(e) {
      this.searching = false
      this.$emit('update:query', '')
      this.$emit('update:selected', -1)
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.search__box {
  position: fixed;
  left: 90px;
  height: 64px;
  padding: 6px 50px 0 10px;
  z-index: 98;
  top: 29px;
  background-color: $red;
  border-radius: 20px;
}
.search__spacer {
  height: 100px;
  width: 100%;
}
</style>
