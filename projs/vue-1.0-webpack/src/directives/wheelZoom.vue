<script>
  import wheelzoom from '../vendor/wheelzoom'

  export default {
    // zoomPercent 递增递减比例因子。
    // maxZoomTimes 最大放大倍数。
    params: ['zoomPercent', 'maxZoomTimes'],
    update (oldVal, newVal) {
      console.log(oldVal, newVal, this.params)
      wheelzoom(this.el, {
        zoom: this.params.zoomPercent || 0.02,
        maxZoomTimes: this.params.maxZoomTimes || 5
      })
    }
  }
</script>
