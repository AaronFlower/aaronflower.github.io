export default {
  functional: true,
  render (h, context) {
    return h('div', {
      class: ['expanded-container']
    }, context.children)
  }
}
