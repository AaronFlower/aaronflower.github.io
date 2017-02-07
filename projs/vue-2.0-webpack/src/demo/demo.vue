<template>
  <div class="demo-container">
    <h3>Render: anchored-heading</h3>
    <anchored-heading :level="1">OK</anchored-heading>
    <anchored-heading :level="2">OK</anchored-heading>
  </div>
</template>

<script>
  import AnchoredHeading from '../components/render/anchoredHeading'
  export default {
    components: {
      AnchoredHeading
    }
  }
</script>

<style scoped>
  .demo-container {
    & > h3 {
      color: #2c3e50;
      counter-reset: h3;
      &:before {
        content: counter(h3) ". ";
        counter-increment: h3;
      }
    }
  }
</style>
