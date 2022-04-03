<template>
  <Editor :data-options="dataOptions" :logic-options="logicOptions" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from './components/Editor.vue'
// eslint-disable-next-line
// @ts-ignore

export default defineComponent({
  name: 'App',
  components: {
    Editor
  },
  data (): {
    [key: string]: any

    } {
    const dataOptions = getDataOptions()
    const logicOptions = getLogicOptions()

    return {
      dataOptions: dataOptions,
      logicOptions: logicOptions
    }
  }
})

function getDataOptions () {
  return [
    {
      label: 'Simple Message',
      value: JSON.stringify({ content: 'Hello' }, null, 2)
    }
  ]
}

function getLogicOptions () {
  return [
    {
      label: 'Return Input',
      value: JSON.stringify({
        var: 'content'
      }, null, 2)
    }
  ]
}
</script>

<style lang="scss">

</style>
