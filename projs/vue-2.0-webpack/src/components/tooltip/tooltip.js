import merge from 'lodash/merge'
// import uniqueId from 'lodash/uniqueId'

export default {
  name: 'Tooltip',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      Type: String,
      default: 'Tooltip'
    }
  },
  data () {
    return {
      $tooltip: null
    }
  },
  methods: {
    createTooltip () {
      this.$tooltip = document.createElement('div')
      this.$tooltip.classList.add('a-tooltip')
      this.$tooltip.classList.add('hidden')
      this.$tooltip.innerText = 'Hello Tooltip'
      this.$tooltip.style.position = 'absolute'
      document.body.appendChild(this.$tooltip)
    },
    onMouseenter () {
      if (!this.disabled) {
        if (!this.$tooltip) {
          this.createTooltip()
        }
        let {left, top, height} = this.$el.getBoundingClientRect()
        this.$tooltip.style.left = left + document.body.scrollLeft + 'px'
        this.$tooltip.style.top = top + document.body.scrollTop - height - 10 + 'px'
        this.$tooltip.classList.remove('hidden')
      }
    },
    onMouseleave () {
      if (!this.disabled) {
        this.$tooltip.classList.add('zoom-out')
        setTimeout(() => {
          this.$tooltip.classList.remove('zoom-out')
          this.$tooltip.classList.add('hidden')
        }, 300)
      }
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
          staticClass: 'a-tooltip-el',
          class: [{disabled: this.disabled}]
        })
        return vnode
      }
    }
  }
}
