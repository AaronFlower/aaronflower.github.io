/**
 * 对于 functional 的组件来说，render 会多一个 context 参数。
 * 用于创建一个无状态的组件，如你想实现的 transition 组件即可以使用 functional 组件。
 */
export default {
  functional: true,
  render (h, context) {
    console.log('expanded-container:', context)
    return h('div', {
      class: ['expanded-container']
    }, context.children)
  }
}
