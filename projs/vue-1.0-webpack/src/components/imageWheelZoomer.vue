<template>
  <div v-el:img-container class="tui-image-wheel-zoomer" :style="imgContainerStyle" @wheel="onImgWheel" @mousedown="onMouseDown" @mouseup="onMouseUp">
  </div>
</template>

<script>
  export default {
    props: {
      zoomImgSrc: {
        type: String,
        default: 'public/images/benz-02.jpg'
      },
      originImgSrc: {
        type: String,
        default: ''
      },
      originWidth: {
        type: Number,
        default: 330
      },
      originHeight: {
        type: Number,
        default: 220
      },
      maxZoomOutTimes: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        height: 0,
        width: 0,
        zoom: 0.01,
        previousPos: {
          posX: 0,
          posY: 0
        },
        bgPosOffset: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      onImgWheel (e) {
        console.log('imgWheel', e)
        e.preventDefault()
        let deltaY = 0
        if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
          deltaY = e.deltaY
        } else if (e.wheelDelta) {
          deltaY = -e.wheelDelta
        }
        if (deltaY > 0 && this.height + this.height * this.zoom > this.maxZoomOutHeight) {
          return
        }
        if (deltaY > 0) {
          this.width += this.width * this.zoom
          this.height += this.height * this.zoom
        } else if (deltaY < 0) {
          if (this.height <= this.originHeight) {
            this.width = this.originWidth
            this.height = this.originHeight
            this.bgPosOffset.x = this.bgPosOffset.y = 0
            this.updateStyle()
          } else {
            this.width -= this.width * this.zoom
            this.height -= this.height * this.zoom
          }
        }
        console.log(e.target.style.backgroundSize)
        console.log(this.width, this.height)
        e.target.style.backgroundSize = `${this.width}px ${this.height}px`
        console.log(e.target.style.backgroundSize)
      },
      onMouseDown (e) {
        console.log('mousedown:', e)
        console.log(this.previousPos)
        this.previousPos.posX = e.clientX
        this.previousPos.posY = e.clientY
      },
      onMouseUp (e) {
        this.offsetX = e.clientX - this.previousPos.posX
        this.offsetY = e.clientY - this.previousPos.posY
        console.log('mouseup:', e)
        console.log(this.offsetX, this.offsetY)
        this.bgPosOffset.x += this.offsetX
        this.bgPosOffset.y += this.offsetY
        this.updateStyle()
      },
      updateStyle () {
        if (this.scale > 1) {
          if (this.bgPosOffset.x > 0) {
            this.bgPosOffset.x = 0
          } else if (this.bgPosOffset.x < this.originWidth - this.width) {
            this.bgPosOffset.x = this.originWidth - this.width
          }

          if (this.bgPosOffset.y > 0) {
            this.bgPosOffset.y = 0
          } else if (this.bgPosOffset.y < this.originHeight - this.height) {
            this.bgPosOffset.y = this.originHeight - this.height
          }

          this.$els.imgContainer.style.backgroundPosition = `${this.bgPosOffset.x}px ${this.bgPosOffset.y}px`
          console.log('pos:', `${this.bgPosOffset.x}px ${this.bgPosOffset.y}px`, this.$els.imgContainer.style.backgroundPosition)
        }
      }
    },
    computed: {
      scale () {
        console.log('scale:', this.height, this.originHeight, this.height / this.originHeight)
        return this.height / this.originHeight
      },
      maxZoomOutHeight () {
        return this.originHeight * this.maxZoomOutTimes
      },
      imgContainerStyle () {
        return {
          width: `${this.originWidth}px`,
          height: `${this.originHeight}px`,
          minWidth: `${this.originWidth}px`,
          minHeight: `${this.originHeight}px`,
          backgroundSize: `${this.originWidth}px ${this.originHeight}px`,
          backgroundImage: `url(${this.originImgSrc})`
        }
      }
    },
    ready () {
      console.log('ready')
      this.width = 330
      this.height = 220
    }
  }
</script>

<style>
.tui-image-wheel-zoomer {
/*  width: 330px;
  height: 220px;
  background-image: url(../assets/images/benz-02.jpg);
  background-size: 330px 220px;*/
  background-repeat: no-repeat;
  cursor: pointer;
  border: 1px dashed #ccc;
}
</style>
