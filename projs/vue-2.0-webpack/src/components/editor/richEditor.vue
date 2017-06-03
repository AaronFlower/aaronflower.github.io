<template>
  <div>
    <!-- <div ref="richContainer" id="rich-input" class="container" contenteditable="true" @focusin="cacheSelection" @keyup="cacheSelection"> -->
    <div ref="richContainer" id="rich-input" class="container" contenteditable="true">
    </div>
    <button @click="insert">Insert</button>
    <button @click="insertDict">Insert Dict</button>
    <word-dict></word-dict>
  </div>
</template>

<script>
  import RenderJsx from '../render/renderJSX'
  import WordDict from './wordDict'
  import Vue from 'vue'

  export default {
    components: {
      WordDict
    },
    methods: {
      createChild () {
        let div = document.createElement('div')
        let slot = document.createElement('slot')
        slot.innerHTML = 'I ve never been to me'
        div.appendChild(slot)
        return div
      },
      insert () {
        // let div = document.createElement('div')
        // this.$refs.richContainer.appendChild(div)
        // let Container = Vue.extend({
        //   components: {
        //     AnchoredHeading
        //   },
        //   render (h) { // <-- h must be in scope
        //     return (
        //       <AnchoredHeading level={1}>
        //         *<span>Insert Test</span>*
        //       </AnchoredHeading>
        //     )
        //   }
        // })
        let div = this.createChild()
        this.$refs.richContainer.appendChild(div)
        console.log(this.$refs.richContainer.lastElementChild)
        let level = Math.floor(Math.random() * 6) + 1
        console.log('level', level)
        let Container = Vue.extend({
          render: (h) => h(
            RenderJsx,
            {
              attrs: {
                'data-k': 'kidding'
              },
              props: {
                level: level
              },
              style: {
                color: ['red', 'deepskyblue', 'cornsilk'][Math.floor(Math.random() * 3)]
              }
            }
          )
        })
        new Container().$mount(this.$refs.richContainer.lastElementChild)
      },
      insertDict () {
        let div = document.createElement('div')
        this.$refs.richContainer.appendChild(div)
        let WordDictContainer = Vue.extend(WordDict)
        new WordDictContainer({
        }).$mount(this.$refs.richContainer.lastElementChild)
      }
    }
  }
</script>

<style>
  .container {
    width: 200px;
    height: 30px;
    white-space: nowrap;
    line-height: 30px;
    border: solid 1px #28E7D7;
  }
</style>
