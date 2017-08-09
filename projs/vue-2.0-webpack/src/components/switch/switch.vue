<template>
  <div class="a-switch switch-wrapper" :class="checked$ ? 'on' : 'off'">
    <div class="cursor" @click="onChange"></div>
    <input type="checkbox" :name="name" :value="value" hidden :checked="checked$">
  </div>
</template>

<script>
  import uniqueId from 'lodash/uniqueId'
  export default {
    props: {
      name: {
        type: String,
        default: uniqueId('switch-')
      },
      value: {
        type: String,
        default: 'on'
      },
      checked: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'checked',
      event: 'on-change'
    },
    methods: {
      onChange () {
        this.checked$ = !this.checked$
      }
    },
    computed: {
      checked$: {
        get () {
          return this.checked
        },
        set (val) {
          console.log('on-change.... emit', val)
          this.$emit('on-change', val)
        }
      }
    }
  }
</script>

<style>
  .switch-wrapper {
    position: relative;
    width: 30px;
    height: 15px;
    border-radius: 50px;
  }
  .switch-wrapper.off {
    background: #ccc;
  }
  .switch-wrapper.on {
    background: #008df2;
  }

  .switch-wrapper .cursor {
    width: 55%;
    height: 100%;
    background: #fff;
    border-radius: 100%;
    position: absolute;
    left: 0px;
    top:-1px;
    border: 1px solid #eee;
    transition: left .2s;
    cursor: pointer;
  }
  .switch-wrapper.on .cursor {
    left: 12px;
  }
</style>
