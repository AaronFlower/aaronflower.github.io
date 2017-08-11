// 不用 JSX 语法来写 render 函数
import AnchoredHeading from './anchoredHeading'

export default {
  components: { AnchoredHeading },
  render (createElement) {
    return createElement(
      'anchored-heading',
      {
        props: {
          level: 5
        }
      },
      [
        createElement(
          'p',
          this.$slots.default
        )
      ]
    )
  }
}
