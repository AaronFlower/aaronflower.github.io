<script>
  export default {
    render: function (createElement) {
      return createElement(
        'h' + this.level,     // html tag
        this.$slots.default   // 子组件中的阵列。
      )
    },
    props: {
      level: {
        type: Number,
        default: 1
      }
    }
  }
</script>
