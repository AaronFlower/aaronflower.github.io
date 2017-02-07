<!-- render 函数中的 t-model 也需要自己来实现。 -->
<script>
  export default {
    render (createElement) {
      let self = this
      return createElement(
        'div',
        [
          createElement(
            'input',
            {
              domProps: {
                type: 'text',
                value: self.valueCopy
              },
              on: {
                input (event) {
                  self.valueCopy = event.target.value
                }
              }
            }
          ),
          createElement(
            'p',
            {
              style: {
                color: 'red'
              }
            },
            self.valueCopy
          )
        ]
      )
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        valueCopy: this.value
      }
    }
  }
</script>
