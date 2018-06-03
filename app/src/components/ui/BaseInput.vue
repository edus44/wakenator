<template>
  <div 
    :class="{focused}"
    class="base-input"
  >
    <label>{{ label }}</label>
    <wired-card 
      :elevation="focused?2:1" 
    >
      <input
        :value="value"
        :placeholder="placeholder"
        @input="e=>$emit('input',e.target.value)"
        @focus="focused=true" 
        @blur="focused=false">
    </wired-card>
  </div>
</template>

<script>
export default {
  props: {
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
  },
  data: () => ({
    focused: false,
  }),
}
</script>

<style lang="scss">
@import '~@/assets/style/constants.scss';

.base-input {
  margin-bottom: 16px;
  text-align: center;

  &.focused {
    color: $red;
  }

  label {
    display: block;
    font-size: 12px;
  }
  input {
    color: white;
    border: 0;
    background: none;
    font-family: 'Gloria Hallelujah', cursive;
    padding: 0 6px;

    &:focus {
      outline: none;
    }
  }
}
</style>
