<template>
  <div style="margin-top: 20px;">
    <h5>图片缩放</h5>
    <image-wheel-zoomer
      :origin-img-src="originImgSrc"
      :zoom-img-src="zoomImgSrc"
    ></image-wheel-zoomer>
    <image-wheel-zoomer
      :origin-img-src="originImgSrc"
      :zoom-img-src="zoomImgSrc"
      :origin-width="550"
      :origin-height="440"
    ></image-wheel-zoomer>
  </div>
</template>

<script>
  import ImageWheelZoomer from '../components/imageWheelZoomer'

  export default {
    components: {
      ImageWheelZoomer
    },
    data () {
      return {
        originImgSrc: 'public/images/benz-02.jpg',
        zoomImgSrc: 'public/images/benz-02.jpg'
      }
    }
  }
</script>

