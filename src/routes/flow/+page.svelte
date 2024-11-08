<script>
  // import { onMount } from 'svelte';
  import FlowChart from '$lib/flow/FlowChart.svelte';
  import {getSelectedLines} from '$lib/selection';
  import {algos} from './algos';
  let nodesToHighlight = [];
  let initialAlgo = algos["Binary Search"];
  let flowText = '';
  
  function handleKeyDown(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      const selectedLines =getSelectedLines(event.target, event.key, event.shiftKey);
      nodesToHighlight = selectedLines;
      let text = textarea.value;  // Bound to the textarea
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      
      if (event.key === "Enter") {
        event.preventDefault();
        const beforeCursor = text.substring(0, start);
        const afterCursor = text.substring(end);
        const previousLine = beforeCursor.split("\n").pop() || "";
        const leadingSpaces = previousLine.match(/^\s*/)[0] || "";
        
        textarea.value = `${beforeCursor}\n${leadingSpaces}${afterCursor}`;
        moveCursor(beforeCursor.length + 1 + leadingSpaces.length);
      }
      else if (event.key === "Tab") {
        event.preventDefault();
        const spaces = "  "; //2
        const beforeCursor = text.substring(0, start);
        const afterCursor = text.substring(end);
  
        textarea.value = `${beforeCursor}${spaces}${afterCursor}`;
        moveCursor(beforeCursor.length + spaces.length);
      }
  
      function moveCursor(position){
        textarea.setSelectionRange(position, position); //from and to are same
      }
    }
  }
  function handleKeyUp(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      flowText = event.target.value;
    }
  }
  function handleClick(event) {
    const textarea = event.target;
    if("text-area" === textarea.id){
      const selectedLines =getSelectedLines(event.target, event.key, event.shiftKey);
      nodesToHighlight = selectedLines;
    }
  }

  function loadAlgo(event){
    initialAlgo = algos[event.target.value];
  }
  
$: flowText = initialAlgo;
</script>

<style>
  .workspace {
    margin-top:80px;
    display: flex;
    height: calc(100vh - 100px);
  }
  .left-panel{width: 30vw; height: 100%; border-right: 1px dashed black;}
  #text-area {
    width: 100%;
    height: 100%;
    border:0;
  }
</style>

<div class="workspace">
  <div class="left-panel">
    <div >Load Example Flow of 
      <select on:change={loadAlgo}>
        {#each Object.keys(algos) as algoName}
          <option value={algoName} >{algoName}</option>
        {/each}
      </select>

    </div>
    <textarea id="text-area" on:keyup={handleKeyUp} on:keydown={handleKeyDown} on:mouseup={handleClick} >
      {initialAlgo}
    </textarea>
  </div>
  <FlowChart style="padding-left:10px; width:65vw; height:100%" bind:text={flowText} bind:selection={nodesToHighlight}/>
</div>
