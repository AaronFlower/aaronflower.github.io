<template>
  <div id="app">
    <hello></hello>
    <almanac></almanac>
    <demo></demo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Almanac from './components/Almanac'
import Demo from './demo/demo'

export default {
  name: 'app',
  components: {
    Hello, Almanac, Demo
  }
}
</script>

<style>
@import url(./assets/css/icon-fonts.css);
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: auto;
}
</style>
