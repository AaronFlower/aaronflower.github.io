<template>
  <div class="tui-image-zoomer">
    <div class="origin-image-container">
      <div class="origin-image-nail">
        <!-- <img v-el:origin-img src="../assets/images/benz-02.jpg" alt="" @click="zoomImage($event)"> -->
        <img v-el:origin-img :src="zoomImgSrc" alt="" @click="zoomOut($event)">
      </div>
      <div class="btn-group">
        <button @click="rotate">R</button>
      </div>
    </div>
    <slot name="zoomer">
      <div class="zoom-image-container">
        <div v-el:lens class="lens"></div>
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    props: {
      originMaxHeight: {
        type: [String, Number],
        default: 150
      },
      originMaxWidth: {
        type: [String, Number],
        default: 210
      },
      lensHeight: {
        type: [String, Number],
        default: 220
      },
      lensWidth: {
        type: [String, Number],
        default: 320
      },
      zoomImgSrc: {
        type: String,
        default: 'public/images/benz-02.jpg'
      }
    },
    data () {
      return {
        zoomImage: {
          width: 0,
          height: 0
        },
        rotateDeg: 0
      }
    },
    methods: {
      rotate () {
        let {top, left} = this.$els.originImg.getBoundingClientRect()
        console.log(this.$els.originImg.getBoundingClientRect())
        console.log(top, left)
        this.rotateDeg = (this.rotateDeg + 90) % 360
        if (this.rotateDeg % 180) {
          this.$els.originImg.style.maxWidth = `${this.originMaxHeight}px`
          this.$els.originImg.style.maxHeigth = `${this.originMaxWidth}px`

          this.$els.lens.style.maxWidth = `${this.lensHeight}px`
          this.$els.lens.style.maxHeigth = `${this.lensWidth}px`
        } else {
          this.$els.originImg.style.maxWidth = `${this.originMaxWidth}px`
          this.$els.originImg.style.maxHeigth = `${this.originMaxHeight}px`

          this.$els.lens.style.maxWidth = `${this.lensWidth}px`
          this.$els.lens.style.maxHeigth = `${this.lensHeight}px`
        }
        this.$els.originImg.style.transform = `rotate(${this.rotateDeg}deg)`
        this.$els.lens.style.transform = `rotate(${this.rotateDeg}deg)`
      },
      zoomOut ($event) {
        if (this.zoomReady) {
          let {top, left} = this.$els.originImg.getBoundingClientRect()
          let offsetLeft = ($event.clientX - left) * this.scale - this.lensWidth / 2
          let offsetTop = ($event.clientY - top) * this.scale - this.lensHeight / 2

          if (offsetLeft < 0) {
            offsetLeft = 0
          }
          if (offsetLeft + this.lensWidth > this.zoomImage.width) {
            offsetLeft = this.zoomImage.width - this.lensWidth
          }
          if (offsetTop < 0) {
            offsetTop = 0
          }
          if (offsetTop + this.lensHeight > this.zoomImage.height) {
            offsetTop = this.zoomImage.height - this.lensHeight
          }
          if (this.isHorizontal) {
            this.$els.lens.style.backgroundPosition = ` -${offsetLeft}px -${offsetTop}px`
          } else {
            this.$els.lens.style.backgroundPosition = ` -${offsetTop}px -${offsetLeft}px`
          }
        }
      },
      init () {
        let _self = this
        let image = new window.Image()
        image.onload = function () {
          _self.zoomImage.width = image.width
          _self.zoomImage.height = image.height
        }
        image.src = this.zoomImgSrc
      }
    },
    computed: {
      zoomReady () {
        return this.zoomImage.width && this.zoomImage.height
      },
      scale () {
        let ws = this.zoomImage.width / this.originMaxWidth
        let hs = this.zoomImage.height / this.originMaxHeight
        return ws > hs ? ws : hs
      },
      isHorizontal () {
        return !this.rotateDeg % 180
      }
    },
    ready () {
      if (this.$els.originImg.complete) {
        this.init()
        console.log('if')
      } else {
        this.$els.originImg.onload = this.init
        console.log('else')
      }
      // if (this.$els.originImg.complete) {
      //  console.log('completed!..')
      // } else {
      //  console.log(this)
      // }
    }
  }
</script>

<style>
  .origin-image-container {
    position: relative;
    width: 250px;
    & .origin-image-nail {
      width: 220px;
      height: 160px;
      border: 1px dashed #ccc;
      cursor: pointer;
      display: table-cell;
      text-align: center;
      vertical-align: middle;

      & img {
        max-width: 210px;
        max-height: 160px;
      }
    }
    & .btn-group {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .zoom-image-container {
    max-width: 360px;
    max-height: 320px;
    width: 360px;
    height: 320px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    border:  1px dashed #ccc;

    & .lens {
      background: rgba(90,90,90,.2);
      top: 0;
      left: 0;
      border: 1px solid red;
      background: url(../assets/images/benz-02.jpg);
      background-repeat: no-repeat;
      width: 320px;
      height: 220px;
      display: inline-block;
    }
  }

</style>
