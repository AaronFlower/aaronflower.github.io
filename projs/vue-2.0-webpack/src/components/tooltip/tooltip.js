import merge from 'lodash/merge'
import uniqueId from 'lodash/uniqueId'
import Vue from 'vue'
import Tip from './tip.vue'

export default {
  name: 'Tooltip',

  components: {
    Tip
  },

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
      $tooltip: null,
      id: uniqueId('a-tooltip-')
    }
  },
  methods: {
    createTooltip () {
      // this.$tooltip = document.createElement('div')
      // this.$tooltip.setAttribute('id', this.id)
      // document.body.appendChild(this.$tooltip)
      // console.log('content:', this.content)
      let self = this
      let Tip = Vue.extend({
        render (h) {
          return h('tip', {
          }, [self.$slots.content || self.content])
        }
      })
      let $tip = new Tip().$mount()
      document.body.appendChild($tip.$el)
      this.$tooltip = $tip.$el
      // this.$tooltip.appendChild($tip.$el)
      // this.$tooltip.classList.add('a-tooltip')
      // this.$tooltip.classList.add('hidden')
      // this.$tooltip.innerText = this.content
      // this.$tooltip.style.position = 'absolute'
      // document.body.appendChild(this.$tooltip)
    },
    onMouseenter () {
      if (!this.disabled) {
        if (!this.$tooltip) {
          this.createTooltip()
        }
        this.$tooltip.classList.remove('hidden')
        // setTimeout(() => {
        //   let tipHeight = this.$tooltip.getBoundingClientRect().height
        //   let {left, top, height} = this.$el.getBoundingClientRect()
        //   this.$tooltip.style.left = left + document.body.scrollLeft + 'px'
        //   console.log(top, document.body.scrollTop, tipHeight, height)
        //   this.$tooltip.style.top = top + document.body.scrollTop - tipHeight - height + 'px'
        // }, 300)
        let {left, top} = this.$el.getBoundingClientRect()
        this.$tooltip.style.left = left + document.body.scrollLeft + 'px'
        this.$tooltip.style.top = top + document.body.scrollTop - this.$tooltip.clientHeight + 'px'
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
