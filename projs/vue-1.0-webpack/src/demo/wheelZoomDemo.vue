<template>
  <div>
    <div class="wheel-zoom-demo-container">
      <img v-el:zoom-img v-wheel-zoom :rotate-deg="rotateDeg" :src="imgSrc" alt="">
    </div>
    <div class="btn-group">
      <button @click="rotate">R</button>
    </div>
  </div>
</template>

<script>
  import wheelZoom from '../directives/wheelZoom'

  export default {
    directives: { wheelZoom },
    data () {
      return {
        imgSrc: 'public/images/benz-02.jpg',
        rotateDeg: 0
      }
    },
    methods: {
      rotate () {
        this.rotateDeg = (this.rotateDeg + 90) % 360
        this.$els.zoomImg.style.transform = `rotate(${this.rotateDeg}deg)`
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
