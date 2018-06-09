<template>
  <div class="config">
    <Back @click.native="changeView('home')"/>
    <BaseInput
      :prepend="'@'"
      :placeholder="'eg. Bob'"
      v-model.trim="name"
      label="your name:"
    />
    <BaseInput
      :prepend="'#'"
      :placeholder="'eg. gigigo'"
      v-model.trim="channel"
      :value="channel"
      label="channel:"
      @input="v=>channel=cleanChannel(v)"
    />
    <button class="back" @click="changeView('home')">Back</button>
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import Back from './Config/Back'
import BaseInput from '@/components/ui/BaseInput'
import { mapMutations, mapActions } from 'vuex'
import debounce from 'lodash/debounce'

export default {
  components: { Rough, Back, BaseInput },
  data: () => ({
    channel: '',
    name: '',
  }),
  watch: {
    channel: debounce(function() {
      this.changeChannel(this.channel)
    }, 500),
    name: debounce(function() {
      this.changeName(this.name)
    }, 500),
  },
  created() {
    this.channel = this.$store.state.auth.channel
    this.name = this.$store.state.auth.name
  },
  methods: {
    ...mapMutations('root', ['changeView']),
    ...mapActions('auth', ['changeName', 'changeChannel']),
    cleanChannel(channel) {
      return channel.toLowerCase().replace(/[^\w-]/g, '')
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.config {
  text-align: center;
  .base-input {
    margin-top: 30px;
  }
  > .back {
    display: inline-block;
    margin-top: 40px;
    font-size: 20px;
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    &:hover,
    &:focus {
      color: $red;
      outline: none;
    }
  }
}
</style>