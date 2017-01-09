<template>
  <div class="tui-image-zoomer">
    <div class="origin-image-container">
      <div class="origin-image-nail">
        <img v-el:origin-img :src="originImgSrc" alt="" @click="zoomOut($event)">
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
      lensMaxHeight: {
        type: [String, Number],
        default: 220
      },
      lensMaxWidth: {
        type: [String, Number],
        default: 320
      },
      zoomImgSrc: {
        type: String,
        default: 'public/images/benz-02.jpg'
      },
      originImgSrc: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        zoomImageInfo: {
          width: 0,
          height: 0
        },
        originImgInfo: {
          width: 0,
          height: 0
        },
        originImgVerticalInfo: {
          width: 0,
          height: 0
        },
        originImgHorizontalInfo: {
          width: 0,
          height: 0
        },
        rotateDeg: 0
      }
    },
    methods: {
      rotate () {
        this.rotateDeg = (this.rotateDeg + 90) % 360
        if (this.rotateDeg % 180) {
          this.$els.originImg.style.maxWidth = `${this.originMaxHeight}px`
          this.$els.originImg.style.maxHeigth = `${this.originMaxWidth}px`

          this.$els.lens.style.maxWidth = `${this.lensMaxHeight}px`
          this.$els.lens.style.maxHeigth = `${this.lensMaxWidth}px`
          this.$els.lens.style.width = `${this.lensMaxHeight}px`
          this.$els.lens.style.height = `${this.lensMaxWidth}px`
        } else {
          this.$els.originImg.style.maxWidth = `${this.originMaxWidth}px`
          this.$els.originImg.style.maxHeigth = `${this.originMaxHeight}px`

          this.$els.lens.style.maxWidth = `${this.lensMaxWidth}px`
          this.$els.lens.style.maxHeigth = `${this.lensMaxHeight}px`
          this.$els.lens.style.width = `${this.lensMaxWidth}px`
          this.$els.lens.style.height = `${this.lensMaxHeight}px`
        }
        this.$els.originImg.style.transform = `rotate(${this.rotateDeg}deg)`
        this.$els.lens.style.transform = `rotate(${this.rotateDeg}deg)`
        this.switchDimension()
      },
      switchDimension () {
        if (this.rotateDeg % 180) {
          if (!this.originImgVerticalInfo.width) {
            let computedStyle = window.getComputedStyle(this.$els.originImg)
            this.originImgVerticalInfo.width = Number.parseInt(computedStyle.width)
            this.originImgVerticalInfo.height = Number.parseInt(computedStyle.height)
          }
          this.originImgInfo.width = this.originImgVerticalInfo.height
          this.originImgInfo.height = this.originImgVerticalInfo.width
        } else {
          this.originImgInfo.width = this.originImgHorizontalInfo.width
          this.originImgInfo.height = this.originImgHorizontalInfo.height
        }
        let swapTemp = this.zoomImageInfo.width
        this.zoomImageInfo.width = this.zoomImageInfo.height
        this.zoomImageInfo.height = swapTemp
      },
      zoomOut ($event) {
        if (this.zoomReady) {
          let halfLensMaxWidth = this.lensMaxWidth / 2
          let halfLensMaxHeight = this.lensMaxHeight / 2
          let {top, left} = this.$els.originImg.getBoundingClientRect()
          let xPos = ($event.clientX - left) * this.scale
          let yPos = ($event.clientY - top) * this.scale
          let leftOffset, topOffset
          if (this.rotateDeg === 90) {
            leftOffset = yPos - halfLensMaxHeight
            topOffset = this.zoomImageInfo.width - (xPos + halfLensMaxWidth)
            leftOffset = leftOffset < 0 ? 0 : leftOffset
            if (leftOffset + this.lensMaxHeight > this.zoomImageInfo.height) {
              leftOffset = this.zoomImageInfo.height - this.lensMaxHeight
            }
            topOffset = topOffset < 0 ? 0 : topOffset
            if (topOffset + this.lensMaxWidth > this.zoomImageInfo.width) {
              topOffset = this.zoomImageInfo.width - this.lensMaxWidth
            }
          } else if (this.rotateDeg === 180) {
            topOffset = this.zoomImageInfo.height - (yPos + halfLensMaxHeight)
            leftOffset = this.zoomImageInfo.width - (xPos + halfLensMaxWidth)
            leftOffset = leftOffset < 0 ? 0 : leftOffset
            if (leftOffset + this.lensMaxWidth > this.zoomImageInfo.width) {
              leftOffset = this.zoomImageInfo.width - this.lensMaxWidth
            }
            topOffset = topOffset < 0 ? 0 : topOffset
            if (topOffset + this.lensMaxHeight > this.zoomImageInfo.height) {
              topOffset = this.zoomImageInfo.height - this.lensMaxHeight
            }
          } else if (this.rotateDeg === 270) {
            leftOffset = this.zoomImageInfo.height - (yPos + halfLensMaxHeight)
            topOffset = xPos - halfLensMaxWidth
            leftOffset = leftOffset < 0 ? 0 : leftOffset
            if (leftOffset + this.lensMaxHeight > this.zoomImageInfo.height) {
              leftOffset = this.zoomImageInfo.height - this.lensMaxHeight
            }
            topOffset = topOffset < 0 ? 0 : topOffset
            if (topOffset + this.lensMaxWidth > this.zoomImageInfo.width) {
              topOffset = this.zoomImageInfo.width - this.lensMaxWidth
            }
          } else {
            leftOffset = xPos - halfLensMaxWidth
            topOffset = yPos - halfLensMaxHeight
            leftOffset = leftOffset < 0 ? 0 : leftOffset
            if (leftOffset + this.lensMaxWidth > this.zoomImageInfo.width) {
              leftOffset = this.zoomImageInfo.width - this.lensMaxWidth
            }
            topOffset = topOffset < 0 ? 0 : topOffset
            if (topOffset + this.lensMaxHeight > this.zoomImageInfo.height) {
              topOffset = this.zoomImageInfo.height - this.lensMaxHeight
            }
          }
          this.$els.lens.style.backgroundPosition = ` -${leftOffset}px -${topOffset}px`
        }
      },
      /**
       * 获取初始化图片参数。
       */
      init () {
        let computedStyle = window.getComputedStyle(this.$els.originImg)
        this.originImgHorizontalInfo.width = this.originImgInfo.width = Number.parseInt(computedStyle.width)
        this.originImgHorizontalInfo.height = this.originImgInfo.height = Number.parseInt(computedStyle.height)
        let _self = this
        let image = new window.Image()
        image.onload = function () {
          _self.zoomImageInfo.width = image.width
          _self.zoomImageInfo.height = image.height
        }
        image.src = this.zoomImgSrc
      }
    },
    computed: {
      zoomReady () {
        return this.zoomImageInfo.width && this.zoomImageInfo.height
      },
      scale () {
        let ws = this.zoomImageInfo.width / this.originImgInfo.width
        let hs = this.zoomImageInfo.height / this.originImgInfo.height
        return ws > hs ? ws : hs
      }
    },
    ready () {
      if (this.$els.originImg.complete) {
        this.init()
      } else {
        this.$els.originImg.onload = this.init
      }
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
