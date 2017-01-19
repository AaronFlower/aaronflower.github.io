<template>
  <div class="demo-container">
    <h5>图片缩放旋转</h5>
    <image-zoomer-demo></image-zoomer-demo>
    <h5>使用wheelZoom插件缩放</h5>
    <wheel-zoom-demo></wheel-zoom-demo>
    <h5>自定义 Image Wheel Zoomer</h5>
    <image-wheel-zoomer-demo></image-wheel-zoomer-demo>
  </div>
</template>

<script>
  import ImageZoomerDemo from './imageZoomerDemo'
  import ImageWheelZoomerDemo from './imageWheelZoomerDemo'
  import WheelZoomDemo from './wheelZoomDemo'

  export default {
    components: {
      ImageZoomerDemo, WheelZoomDemo, ImageWheelZoomerDemo
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
