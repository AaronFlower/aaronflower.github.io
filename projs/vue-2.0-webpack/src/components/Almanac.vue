<template>
  <div class="af-almanac">
    <h2>S:</h2>
    <h3>Scoped</h3>
    <scoped></scoped>
  </div>
</template>

<script>
  import Scoped from './almanac/scoped'

  export default {
    components: {
      Scoped
    }
  }
</script>

<style scoped>
  .af-almanac {
    text-align: left;
  }
</style>
