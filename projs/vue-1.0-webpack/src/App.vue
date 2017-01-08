<template>
  <div id="app">
    <hello></hello>
    <demo></demo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Demo from './demo/demo'

export default {
  components: {
    Hello, Demo
  }
}
</script>

<style>
body {
  width: 90%;
  margin: auto;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
