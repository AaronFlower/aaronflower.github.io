<!-- 用 JSX 语法来写 render 函数 -->
<script>
  import AnchoredHeading from './anchoredHeading'

  export default {
    components: {
      AnchoredHeading
    },
    render (h) { // <-- h must be in scope
      return (
        <AnchoredHeading level={3}>
          *<span>{this.$slots.default}</span>*
        </AnchoredHeading>
      )
    }
  }
</script>
