<template>
  <v-app>
    <v-toolbar 
      app 
      color="primary" 
      dark
    >
      <v-toolbar-title>Vue boilerplate</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './views/Home'
export default {
  components: { Home },
}
</script>
