<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
  const iconPrefixer = 'tui-icon'

  export default {
    props: {
      type: String,
      size: [Number, String],
      color: String
    },

    computed: {
      classes () {
        return `${iconPrefixer} ${iconPrefixer}-${this.type}`
      },
      styles () {
        let style = {}
        let size = Number.parseInt(this.size)
        if (size) {
          style['font-size'] = `${size}`
        }
        if (this.color) {
          style.color = this.color
        }
        return style
      }
    }
  }
</script>
