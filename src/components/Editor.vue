<template>
  <div class="json-logic">
    <div class="editor-holder">
      <div class="data-editor">
        <div class="options-container">
          <div class="select-wrap">
            <VSelect v-model="selecteData" :options="dataOptions" @option:selected="handleDataSelect" />
          </div>
          <div class="select-wrap">
            <VSelect v-model="selectedLogic" :options="logicOptions" @option:selected="handledLogicSelect" />
          </div>
        </div>
        <div class="input-editor-wrap">
          <div class="editor-wrap" ref="dataContainer" />
        </div>
      </div>
      <div class="editor">
        <div class="editor-wrap" ref="editorContainer" />
      </div>
      <div class="preview">
        <div class="editor-wrap" ref="previewContainer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as monaco from 'monaco-editor'
import { defineComponent, PropType } from 'vue'
import VSelect from 'vue-select'
// eslint-disable-next-line
// @ts-ignore
import jspoLogic from '@hello-charles/json-logic'

export default defineComponent({
  name: 'JsonLogicEditor',
  components: {
    VSelect
  },
  props: {
    dataOptions: {
      type: Array as PropType<Array<{label: string, value: string }>>
    },
    logicOptions: {
      type: Array as PropType<Array<{label: string, value: string }>>
    }
  },
  data (): {
    [key: string]: any

    } {
    const dataOptions = this.dataOptions
    const logicOptions = this.logicOptions

    return {
      dataInput: dataOptions?.[0].value,
      logicInput: logicOptions?.[0].value,
      output: '',
      selecteData: dataOptions?.[0].label,
      selectedLogic: logicOptions?.[0].label
    }
  },
  dataEditor: undefined,
  inputEditor: undefined,
  previewEditor: undefined,
  mounted () {
    this.$options.dataEditor = monaco.editor.create(this.$refs.dataContainer as HTMLElement, {
      value: this.dataInput,
      language: 'json'
    })

    this.$options.inputEditor = monaco.editor.create(this.$refs.editorContainer as HTMLElement, {
      value: this.logicInput,
      language: 'json'
    })

    this.$options.inputEditor?.onDidChangeModelContent(() => {
      this.handdleModelValue(this.$options.inputEditor?.getModel()?.getValue())
    })

    this.$options.previewEditor = monaco.editor.create(this.$refs.previewContainer as HTMLElement, {
      value: this.output,
      language: 'text'
    })
  },
  methods: {
    handdleModelValue (value?: string) {
      if (!value) {
        this.input = ''
        return
      }

      this.input = value

      try {
        const dataInput = JSON.parse(this.$options.dataEditor?.getModel()?.getValue())
        const logicInput = JSON.parse(this.input)
        console.debug({
          dataInput,
          logicInput
        })

        const result = jspoLogic.apply(logicInput, dataInput)
        console.debug({
          result
        })

        this.setEditorModelValue(this.$options.previewEditor, result)
      } catch (err) {
        console.error(err)
      }
    },
    setEditorModelValue (editor?: monaco.editor.IStandaloneCodeEditor, value?: string) {
      if (!editor) return
      if (!value) {
        editor.getModel()?.setValue('')
        return
      }

      editor.getModel()?.setValue(value)
    },
    handleDataSelect (data: { value?: string}) {
      this.setEditorModelValue(this.$options.dataEditor, data.value)
    },
    handledLogicSelect (data: { value?: string}) {
      this.setEditorModelValue(this.$options.inputEditor, data.value)
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
@import url('vue-select/dist/vue-select.css');

.json-logic {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  .editor-holder {
    width: 100%;
    height: 100%;

    .data-editor {
      height: 100%;
      width: 33%;
      display: inline-block;
    }

    $options-height: 50px;

    .input-editor-wrap {
      height: calc(100% - $options-height)
    }

    .options-container {
      width: 100%;
      display: flex;
      height: calc($options-height);

      .select-wrap {
      width: 50%;
      }
    }

    .editor {
      height: 100%;
      width: 33%;
      display: inline-block;
    }

    .preview {
      height: 100%;
      width: 33%;
      display: inline-block;
    }

    .editor-wrap {
      height: 100%;
    }
  }

}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
