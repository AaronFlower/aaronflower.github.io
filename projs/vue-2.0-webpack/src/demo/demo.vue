<template>
  <div class="demo-container">
    <h3 class="header-sequence">Render: anchored-heading</h3>
    <anchored-heading :level="1">Header 1</anchored-heading>
    <anchored-heading :level="3">Header 3</anchored-heading>
    <anchored-heading :level="5">Header 5</anchored-heading>
    <h3 class="header-sequence">Render: repeat-render</h3>
    <repeat-render>Foo</repeat-render>
    <repeat-render :times="15">ooT</repeat-render>
    <repeat-render :times="10">Zoo</repeat-render>
    <h3 class="header-sequence">Render: t-model render</h3>
    <input-model-render :value="inputValue"></input-model-render>
    <h3 class="header-sequence">Render: Non-JSX syntax</h3>
    <render-non-jsx>Hello Render Non JSX</render-non-jsx>
    <h3 class="header-sequence">Render: JSX syntax</h3>
    <render-jsx>Hello Render JSX</render-jsx>
  </div>
</template>

<script>
  import AnchoredHeading from '../components/render/anchoredHeading'
  import RepeatRender from '../components/render/repeatRender'
  import InputModelRender from '../components/render/inputModelRender'
  import RenderNonJsx from '../components/render/RenderNonJsx'
  import RenderJsx from '../components/render/RenderJsx'

  export default {
    components: {
      AnchoredHeading, RepeatRender, InputModelRender, RenderJsx, RenderNonJsx
    },
    data () {
      return {
        inputValue: 'Hello Vue'
      }
    }
  }
</script>

<style scoped>
  .demo-container {
    counter-reset: h3;
    & > h3.header-sequence {
      color: #2c3e50;
      &:before {
        content: counter(h3) ". ";
        counter-increment: h3;
      }
    }
  }
</style>
