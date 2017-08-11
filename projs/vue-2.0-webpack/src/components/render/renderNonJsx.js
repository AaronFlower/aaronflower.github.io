// 不用 JSX 语法来写 render 函数
import AnchoredHeading from './anchoredHeading'

export default {
  components: { AnchoredHeading },
  render (h, context) {
    console.log('render achore anchored-heading...', context)
    return h(
      'anchored-heading',
      {
        props: {
          level: 5
        }
      },
      [
        h(
          'p',
          this.$slots.default
        )
      ]
    )
  }
}
