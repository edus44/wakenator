<template>
  <div :class="{ focused, light }" class="base-input">
    <label>{{ label }}</label>
    <span class="prepend">{{ prepend }}</span>
    <input
      ref="input"
      :value="value"
      :placeholder="placeholder"
      @input="e => $emit('input', e.target.value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <Rough
      ref="line"
      :width="250"
      :height="10"
      :interval="focused ? 200 : 0"
      :render="renderLine"
      class="line"
    />
  </div>
</template>

<script>
import Rough from '@/components/ui/Rough'

export default {
  components: { Rough },
  props: {
    prepend: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    light: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    focused: false,
  }),
  watch: {
    focused() {
      this.$refs.line.refresh()
    },
  },
  methods: {
    renderLine(rc) {
      const stroke = this.light ? '#1d1b17' : this.focused ? '#df4418' : 'white'

      rc.line(10, 5, 240, 5, { stroke, roughness: 1 })
    },
    focus() {
      this.$refs.input && this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.base-input {
  font-size: 20px;
  text-align: center;

  &.focused {
    color: $red;
  }
  &.light {
    input {
      color: $black;
    }
  }

  label {
    display: block;
  }
  input {
    color: white;
    border: 0;
    background: none;
    padding: 0 6px;
    font-size: 22px;
    width: 200px;

    &:focus {
      outline: none;
    }
  }
  .line {
    display: block;
    margin: 0 auto;
  }
  .prepend {
    font-size: 30px;
    line-height: 36px;
    vertical-align: text-bottom;
  }
}
</style>
