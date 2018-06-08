<template>
  <div class="config">
    <Back @click.native="changeView('home')"/>
    <BaseInput
      :prepend="'#'"
      :placeholder="'eg. gigigo'"
      v-model.trim="channel"
      :value="channel"
      label="channel:"
      @input="setChannel"
    />
    <BaseInput
      :prepend="'@'"
      :placeholder="'eg. Bob'"
      v-model.trim="name"
      label="your name:"
    />
    <button class="back" @click="changeView('home')">Back</button>
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'
import Back from '@/components/layout/Back'
import BaseInput from '@/components/ui/BaseInput'
import { mapMutations } from 'vuex'

export default {
  components: { Rough, Back, BaseInput },
  data: () => ({
    channel: '',
    name: '',
  }),
  methods: {
    ...mapMutations('root', ['changeView']),
    setChannel(channel) {
      this.channel = channel.toLowerCase().replace(/[^\w-]/g, '')
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