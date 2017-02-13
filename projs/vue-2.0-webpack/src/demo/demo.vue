<template>
  <div class="demo-container">
    <h3 class="header-sequence">Render: anchored-heading</h3>
    <anchored-heading :level="1">Header 1</anchored-heading>
    <anchored-heading :level="3">Header 3</anchored-heading>
    <anchored-heading :level="5">Header 5</anchored-heading>
    <h3 class="header-sequence">Render: anchored-heading-origin</h3>
    <anchored-heading-origin :level="3">Header 1 <p>Anchored Origin</p></anchored-heading-origin>
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
    <h3 class="header-sequence">Render: Functional Render</h3>
<!--     <smart-list>
      <anchored-heading-origin>Foo<p>Functional Component</p></anchored-heading-origin>
    </smart-list> -->
    <h3 class="header-sequence">Template Compiler: Template Foo</h3>
    <functional-container><template-foo></template-foo></functional-container>
    <template-foo></template-foo>
    <h3 class="header-sequence">Rich Editor compile</h3>
    <rich-editor></rich-editor>
    <h3 class="header-sequence">Scoped Slot</h3>
    <scoped-slot></scoped-slot>
    <h2>组件库</h2>
    <h3>icon</h3>
    <tui-components></tui-components>
  </div>
</template>

<script>
  import AnchoredHeading from '../components/render/anchoredHeading'
  import AnchoredHeadingOrigin from '../components/render/anchoredHeadingOrigin'
  import RepeatRender from '../components/render/repeatRender'
  import InputModelRender from '../components/render/inputModelRender'
  import RenderNonJsx from '../components/render/RenderNonJsx'
  import RenderJsx from '../components/render/RenderJsx'
  import SmartList from '../components/render/smartList'
  import TemplateFoo from '../components/render/templateFoo'
  import FunctionalContainer from '../components/render/functionalContainer'
  import RichEditor from '../components/editor/RichEditor'
  import ScopedSlot from '../components/almanac/scopedSlotChild'
  import TuiComponents from './tuiComponents'

  export default {
    components: {
      AnchoredHeading,
      RepeatRender,
      InputModelRender,
      RenderJsx,
      RenderNonJsx,
      SmartList,
      TemplateFoo,
      AnchoredHeadingOrigin,
      FunctionalContainer,
      RichEditor,
      ScopedSlot,
      TuiComponents
    },
    props: {
      items: {
        type: Array,
        default () {
          return ['1', '2']
        }
      }
    },
    data () {
      return {
        inputValue: 'Hello Vue',
        listItems: [
          'Machine Learning',
          'Vue Definitive Guide',
          'Probability'
        ]
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
