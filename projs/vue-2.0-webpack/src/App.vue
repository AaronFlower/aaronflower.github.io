<template>
  <div id="app">
    <h1>Vue 2.0 Demo</h1>
    <almanac></almanac>
    <demo></demo>
  </div>
</template>

<script>
import Almanac from './components/Almanac'
import Demo from './demo/demo'

export default {
  name: 'app',
  components: {
    Almanac, Demo
  }
}
</script>

<style>
@import url(./assets/css/icon-fonts.css);
@import './assets/css/components/main.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: auto;
}
</style>
