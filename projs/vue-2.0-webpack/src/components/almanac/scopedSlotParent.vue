<template>
  <div class="parent">
    在父级中，具有特殊属性 scope 的 <template> 元素，表示它是作用域插槽的模板。
    <child>
      <template scope="props">
        <span>Hello from parent</span>
        <span>{{props}}</span>
      </template>
    </child>
  </div>
</template>

<script>
  import Child from './scopedSlotChild'

  export default {
    components: {
      Child
    }
  }
</script>
