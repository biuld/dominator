<script>
  import { onMount } from "svelte";
  import { Cell } from "./cell";
  import { initLib } from "./monaco";

  let cell = new Cell();

  onMount(async () => {
    await initLib();

    cell.initConsole()
    cell.initEditor()
  });
</script>

<div class="cell">
  <button id="runBtn" on:click={() => cell.run()}>RUN</button>
  <div id="editor-container" bind:this={cell.editorContainer}></div>
  <div id="console-container" bind:this={cell.consoleContainer}></div>
</div>

<style>
  .cell {
    display: flex;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    flex-direction: row;
    height: 100vh;
    justify-content: flex-start;
    background-color: #212121;
    padding: 5%;
  }

  #runBtn {
    width: 6rem;
    height: 1.5rem;
    margin-right: 1rem;
  }

  #editor-container {
    border: solid 1px #ccc;
    box-sizing: border-box;
    width: 50%;
    margin-right: 1rem;
  }

  #console-container {
    border: solid 1px #ccc;
    box-sizing: border-box;
    width: 40%;
  }
</style>
