import merge from 'lodash/merge'

export default {
  methods: {
    onMouseenter () {
      console.log('on mouseenter...')
    },
    onMouseleave () {
      console.log('on mouseleave...')
    }
  },
  render (h) {
    if (this.$slots.default && this.$slots.default.length) {
      this.$slots.default.forEach(node => console.log(node, node.tag, node.data))
      let vnode
      if (this.$slots.default.some((node) => {
        vnode = node
        return node.tag
      })) {
        vnode.data = merge(vnode.data || {}, {
          on: {
            mouseenter: this.onMouseenter,
            mouseleave: this.onMouseleave
          },
          staticClass: 'a-tooltip'
        })
        console.log('return ...', vnode.data)
        return vnode
      }
    }
  }
}
