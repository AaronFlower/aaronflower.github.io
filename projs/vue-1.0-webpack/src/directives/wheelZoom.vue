<script>
  import wheelzoom from '../vendor/wheelzoom'

  export default {
    params: ['zoomPercent'],
    update (oldVal, newVal) {
      console.log(oldVal, newVal, this.params)
      wheelzoom(this.el, {zoom: this.params.zoomPercent || 0.02})
    }
  }
</script>
