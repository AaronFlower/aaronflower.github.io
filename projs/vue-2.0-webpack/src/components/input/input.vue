<template>
  <div>
    <p>{{value}}</p>
    <input type="text" v-model="value">
  </div>
</template>

<script>
  export default {
    props: {
      value: '',
      type: 'text'
    },
    computed: {
      model: {
        getter () {
          return this.value
        }
      }
    }
  }
</script>
