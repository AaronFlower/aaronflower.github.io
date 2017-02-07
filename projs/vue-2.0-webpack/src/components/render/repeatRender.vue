<!--
  render 所有组件树中的 VNodes 必须唯一,
  所以如果你需要多个相同的 Vnodes 就需要用循环单独创建。
  另外， v-if, v-for 也要自己用 JS 来实现。
-->
<script>
  export default {
    render (createElement) {
      let _self = this
      return createElement(
        'div',
        Array.apply(null, {length: this.times}).map(function () {
          return createElement('span', _self.$slots.default)
        })
      )
    },
    props: {
      times: {
        type: Number,
        default: 20
      }
    }
  }
</script>
