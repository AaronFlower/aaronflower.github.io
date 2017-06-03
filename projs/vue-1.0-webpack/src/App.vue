<template>
  <div id="app">
    <hello></hello>
    <demo></demo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Demo from './demo/demo'
import 'babel-polyfill'

export default {
  components: {
    Hello, Demo
  },
  ready () {
    console.log('set-polyfill')
    let s = new Set([1, 2, 3, 1])
    console.log(s)
    console.log('a-findIndex...')
    let arr = [1, 2, NaN, 3, 4]
    console.log(arr.findIndex(isNaN))
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
