<template>
  <div id="app">
    <div ref="editorRef"></div>
    <div @click="addVar">插入数据</div>
    <div @click="getCont">导出数据</div>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme
import './formatter';

export default {
  name: 'App',
  _editor: null,
  mounted() {
    this.$options._editor = new Quill(this.$refs.editorRef, {
      theme: 'snow',
      boundary: document.body,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
      placeholder: 'Insert text here ...',
      readOnly: false,
    });
  },
  methods: {
    addVar() {
      this.$options._editor.insertEmbed(0, 'variable', {
        value: 'variable name',
      });
    },
    getCont() {
      console.log(this.$options._editor.getContents());
    },
  },
  beforeDestroy() {
    if (this.$options._editor) {
      this.$options._editor = null;
      delete this.$options._editor;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
