<template>
  <div class="a-tooltip">
    <slot>{{content || 'no content'}}</slot>
  </div>
</template>

<script>
  export default {
    name: 'Tip',

    props: {
      content: 'Foo tip'
    }
  }
</script>
