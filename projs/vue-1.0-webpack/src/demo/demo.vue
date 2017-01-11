<template>
  <div class="demo-container">
    <h5>图片缩放旋转</h5>
    <image-zoomer-demo></image-zoomer-demo>
    <h5>wheelZoom 缩放</h5>
    <wheel-zoom-demo></wheel-zoom-demo>
  </div>
</template>

<script>
  import ImageZoomerDemo from './imageZoomerDemo'
  import WheelZoomDemo from './wheelZoomDemo'

  export default {
    components: {
      ImageZoomerDemo, WheelZoomDemo
    }
  }
</script>
<style scoped>
  .demo-container {
    counter-reset: h5;
  }
  h5:before {
    content: counter(h5) ". ";
    counter-increment: h5;
  }
</style>
