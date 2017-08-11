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
    <functional-container>
      <template-foo></template-foo>
      <p>What is the context argument</p>
    </functional-container>
    <template-foo></template-foo>
    <h3 class="header-sequence">Rich Editor compile</h3>
    <rich-editor></rich-editor>
    <h3 class="header-sequence">Scoped Slot</h3>
    <scoped-slot></scoped-slot>
    <h2>组件库</h2>
    <h3>icon</h3>
    <tui-components></tui-components>
    <h3>input</h3>
    <a-input-demo></a-input-demo>
    <h3>滚动条</h3>
    <scroll-bar></scroll-bar>
    <h3>Switch</h3>
    <a-switch
      :name="mySwitch.name"
      :value="mySwitch.value"
      v-model="mySwitch.checked"
    ></a-switch>
    <p>{{mySwitch}}</p>
    <h3>Tooltip</h3>
    <tooltip>
      <anchored-heading :level="2">Tooltip Header 2</anchored-heading>
      <anchored-heading :level="3">Tooltip Header 3</anchored-heading>
      Big big world!
    </tooltip>
    <tooltip>
    </tooltip>
  </div>
</template>

<script>
  import AnchoredHeading from '../components/render/anchoredHeading'
  import AnchoredHeadingOrigin from '../components/render/anchoredHeadingOrigin'
  import RepeatRender from '../components/render/repeatRender'
  import InputModelRender from '../components/render/inputModelRender'
  import RenderNonJsx from '../components/render/renderNonJsx'
  import RenderJsx from '../components/render/renderJsx'
  import SmartList from '../components/render/smartList'
  import TemplateFoo from '../components/render/templateFoo'
  import FunctionalContainer from '../components/render/functionalContainer'
  import RichEditor from '../components/editor/richEditor'
  import ScopedSlot from '../components/almanac/scopedSlotChild'
  import TuiComponents from './tuiComponents'
  import ScrollBar from './scrollbar'
  import AInputDemo from '../components/input/demo'
  import ASwitch from '../components/switch'
  import Tooltip from '../components/tooltip'

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
      TuiComponents,
      ScrollBar,
      AInputDemo,
      ASwitch,
      Tooltip
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
        ],
        mySwitch: {
          checked: true,
          name: 'open',
          value: 'on'
        }
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
