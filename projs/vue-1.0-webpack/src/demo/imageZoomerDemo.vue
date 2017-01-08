<template>
  <div style="margin-top: 20px;">
    <h5>图片缩放</h5>
    <image-zoomer
      :origin-img-src="originImgSrc"
      :zoom-img-src="zoomImgSrc"
    ></image-zoomer>
  </div>
</template>

<script>
  import ImageZoomer from '../components/imageZoomer'

  export default {
    components: {
      ImageZoomer
    },
    data () {
      return {
        originImgSrc: 'public/images/benz-02.jpg',
        zoomImgSrc: 'public/images/benz-02.jpg'
      }
    }
  }
</script>

