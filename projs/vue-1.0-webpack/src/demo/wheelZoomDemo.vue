<template>
  <div class="wheel-zoom-demo-container">
    <img v-wheel-zoom :src="imgSrc" alt="">
  </div>
</template>

<script>
  import wheelZoom from '../directives/wheelZoom'

  export default {
    directives: { wheelZoom },
    data () {
      return {
        imgSrc: 'public/images/benz-02.jpg'
      }
    }
  }
</script>

<style>
  .wheel-zoom-demo-container {
    & img {
      max-width: 320px;
      max-height: 240px;
    }
  }
</style>
