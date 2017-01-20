<template>
  <div style="margin-top: 20px;">
    <h5>图片缩放</h5>
    <image-wheel-zoomer
      v-ref:zoomer
      :origin-img-src="originImgSrc"
      :zoom-img-src="zoomImgSrc"
      :roate-deg="roateDeg"
    ></image-wheel-zoomer>
    <div class="btn-group">
      <button @click="rotate">R</button>
    </div>
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
        zoomImgSrc: 'public/images/benz-02.jpg',
        rotateDeg: 0
      }
    },
    methods: {
      rotate () {
        this.rotateDeg = (this.rotateDeg + 90) % 360
        this.$refs.zoomer.$el.style.transform = `rotate(${this.rotateDeg}deg)`
      }
    }
  }
</script>

