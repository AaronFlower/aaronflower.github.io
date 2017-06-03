<!-- Funcitonal Components 函数化组件。 -->
<template>
  <div>
    p
    <smart-list></smart-list>
    k
  </div>
</template>
<script>
  // var EmptyList = {}
  // var TableList = {}
  // var OrderedList = {}
  // var UnorderedList = {}
  import Vue from 'vue'

  var EmptyList = { /* ... */ }
  var TableList = { /* ... */ }
  var OrderedList = { /* ... */ }
  var UnorderedList = { /* ... */ }
  Vue.component('smart-list', {
    functional: true,
    render: function (createElement, context) {
      function appropriateListComponent () {
        var items = context.props.items
        if (items.length === 0) return EmptyList
        if (typeof items[0] === 'object') return TableList
        if (context.props.isOrdered) return OrderedList
        return UnorderedList
      }
      return createElement(
        appropriateListComponent(),
        context.data,
        context.children
      )
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      isOrdered: Boolean
    }
  })

  // export default {
  //   functional: true,
  //   render: function (createElement, context) {
  //     console.log(createElement, context)
  //     function appropriateListComponent () {
  //       // var items = context.props.items
  //       // if (items.length === 0) return EmptyList
  //       // if (typeof items[0] === 'object') return TableList
  //       // if (context.props.isOrdered) return OrderedList
  //       return UnorderedList
  //     }

  //     return createElement(
  //       appropriateListComponent(),
  //       context.data,
  //       context.children
  //     )
  //   },
  //   props: {
  //     items: {
  //       type: Array,
  //       required: true
  //     },
  //     isOrdered: {
  //       type: Boolean,
  //       default: false
  //     }
  //   }
  // }
</script>
