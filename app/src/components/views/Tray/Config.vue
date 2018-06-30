<template>
  <div class="config">
    <Back @click.native="goBack"/>
    <BaseInput
      ref="name"
      :prepend="'@'"
      :placeholder="'like... Bob'"
      v-model.trim="name"
      label="your name"
    />
    <BaseInput
      ref="channel"
      :prepend="'#'"
      :placeholder="'like... gigigo'"
      v-model.trim="channel"
      :value="channel"
      label="people channel"
      @input="v=>channel=cleanChannel(v)"
    />
    <button class="back" @click="goBack">Back</button>
    <footer>
      <a @click="openURL('https://github.com/edus44/wakenator/releases/latest')">Wakenator v{{ DESKTOP_VERSION }}</a>
      &bull;
      <a @click="close">Close app</a>
    </footer>
  </div>
</template>

<script>
import Back from './Config/Back'
import BaseInput from '@/components/ui/BaseInput'
import { mapMutations, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import { close, openURL } from '@/lib/win'

export default {
  components: { Back, BaseInput },
  data: () => ({
    channel: '',
    name: '',
    DESKTOP_VERSION: process.env.DESKTOP_VERSION,
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
    this.channel = this.$store.state.user.channel
    this.name = this.$store.state.user.name
  },
  mounted() {
    this.focus()
  },
  methods: {
    ...mapMutations('root', ['changeView']),
    ...mapActions('user', ['changeName', 'changeChannel']),
    cleanChannel(channel) {
      return channel.toLowerCase().replace(/[^\w-]/g, '')
    },
    goBack() {
      if (!this.name || !this.channel) return this.focus()
      this.changeView('home')
    },
    focus() {
      if (!this.name) return this.$refs.name.focus()
      if (!this.channel) return this.$refs.channel.focus()
    },
    close,
    openURL,
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
  footer {
    font-weight: lighter;
    font-size: 12px;
    color: #666;
    margin-top: 12px;
    a {
      color: #666;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: $red;
        text-decoration: underline;
      }
    }
  }
}
</style>