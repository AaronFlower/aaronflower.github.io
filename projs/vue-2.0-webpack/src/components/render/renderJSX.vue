<!--
  用 JSX 语法来写 render 函数
  JSX 是 React 引入的，遇到 < 当 HTML解析； 遇到 { 当 JS 解析。
-->
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
