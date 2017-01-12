<script>
  import wheelzoom from '../vendor/wheelzoom'

  export default {
    // zoomPercent 递增递减比例因子。
    // maxZoomTimes 最大放大倍数。
    // rotateDeg 图片旋转度数(正负90的倍数)。
    params: ['zoomPercent', 'maxZoomTimes', 'rotateDeg'],
    paramWatchers: {
      rotateDeg: function (val, oldVal) {
        this.el.dataset.rotateDeg = val
      }
    },
    update (oldVal, newVal) {
      wheelzoom(this.el, {
        zoom: this.params.zoomPercent || 0.02,
        maxZoomTimes: this.params.maxZoomTimes || 5
      })
      this.el.dataset.rotateDeg = 0
    }
  }
</script>
