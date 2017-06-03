<template>
  <div>
    <p>value: {{value1}}</p>
    <p>model: {{model}}</p>
    <input v-model="model"></input>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: 'Hello...'
      }
    },
    computed: {
      model: {
        get () {
          return '$' + this.value1
        },
        set (value) {
          this.value1 = value.substr(1)
        }
      }
    }
  }
</script>
