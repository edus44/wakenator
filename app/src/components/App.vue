<template>
  <div class="red">
    <wired-card >
      <wired-input 
        ref="input" 
        placeholder="Enter name" 
        @input="e=>input=e.target.value"/>
      <wired-button @click="clicked">{{ input }}</wired-button>
      
    </wired-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    input: 'hey',
  }),
  methods: {
    clicked() {
      console.log('clicked')
    },
    onInput(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss">
.tal {
  width: 390px;
  height: 390px;
}
.red {
  color: white;
}

body {
  overflow: hidden;
  background-color: black;
}
</style>