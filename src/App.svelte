<script>
  import { onMount } from "svelte";

  import { initEditor, initLib } from "./monaco";

  let editor;

  // 初始化编辑器
  onMount(async () => {
    const container = document.getElementById("monaco-editor");
    editor = await initEditor(container);

    await initLib();
  });

  // 执行编辑器中的代码
  function runCode() {
    const code = editor.getValue();
    browser.devtools.inspectedWindow.eval(code); // 执行传递过来的代码
  }
</script>

<div id="monaco-editor"></div>

<!-- 浮动的运行按钮 -->
<button class="run-button" on:click={runCode}>Run</button>

<style>
  #monaco-editor {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .run-button {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 10px 20px;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    z-index: 1000; /* 确保按钮位于最前面 */
  }
  .run-button:hover {
    background-color: #005f99;
  }
</style>
